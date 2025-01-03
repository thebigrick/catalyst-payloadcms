import { Page } from '@thebigrick/catalyst-payloadcms/generated-types';

export interface BlockComponentProps {
  block: NonNullable<Page['blocks']>[number] & {
    __typename?: string;
  };
}

export type GraphQLDocsCollection<TDoc, TCollection extends string> = Record<
  TCollection,
  { docs: TDoc[] }
>;

export type GraphQLDoc<TDoc, TResource extends string> = Record<TResource, TDoc>;
