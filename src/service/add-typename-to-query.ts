import { DocumentNode, Kind, parse, print, SelectionSetNode, visit } from '@0no-co/graphql.web';

const addTypenameToQuery = (gqlDocument: string | DocumentNode): string => {
  const document = typeof gqlDocument === 'string' ? parse(gqlDocument) : gqlDocument;

  // Visitor function to modify selection sets
  const addTypenameVisitor = {
    SelectionSet(node: SelectionSetNode): SelectionSetNode {
      // Check if __typename is already present
      const hasTypename = node.selections.some(
        (selection) => selection.kind === Kind.FIELD && selection.name.value === '__typename',
      );

      // If not, add it
      if (!hasTypename) {
        return {
          ...node,
          selections: [
            ...node.selections,
            {
              kind: Kind.FIELD,
              name: { kind: Kind.NAME, value: '__typename' },
            },
          ],
        };
      }

      return node; // No modification needed
    },
  };

  // Visit the AST and modify it
  const modifiedDocument = visit(document, addTypenameVisitor);

  // Convert back to string
  return print(modifiedDocument);
};

export default addTypenameToQuery;
