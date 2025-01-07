import { DocumentNode, Kind } from '@0no-co/graphql.web';

/**
 * Extracts fragments from a document
 * @param {DocumentNode} document
 * @returns {Record<string, DocumentNode>} The extracted fragments
 */
const extractFragments = (document: DocumentNode): Record<string, DocumentNode> => {
  return document.definitions
    .filter((def) => def.kind === Kind.FRAGMENT_DEFINITION)
    .reduce<Record<string, DocumentNode>>((acc, def) => {
      if ('name' in def && def.name.value) {
        const fragmentName = def.name.value;

        acc[fragmentName] = {
          kind: Kind.DOCUMENT,
          definitions: [def],
        };
      }

      return acc;
    }, {});
};

export default extractFragments;
