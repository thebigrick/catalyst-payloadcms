import { DocumentNode } from '@0no-co/graphql.web';
import { FragmentDefinitionNode } from 'graphql/language';

import extractFragments from '@thebigrick/catalyst-payloadcms/service/extract-fragments';

export interface FragmentQueryResult {
  request: string;
  fragments: FragmentDefinitionNode[];
  map: Record<string, FragmentDefinitionNode>;
}

const getFragmentsQuery = (documents: DocumentNode[]): FragmentQueryResult => {
  const fragments: Record<string, FragmentDefinitionNode> = documents.reduce((acc, fragment) => {
    return {
      ...acc,
      ...extractFragments(fragment),
    };
  }, {});

  const request = Object.keys(fragments)
    .map((key) => `...${key}`)
    .join('\n');

  return {
    request,
    fragments: Object.values(fragments),
    map: fragments,
  };
};

export default getFragmentsQuery;
