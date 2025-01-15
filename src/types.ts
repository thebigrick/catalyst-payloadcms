import { DocumentNode } from '@0no-co/graphql.web';
import { Block } from 'payload';
import { DatabaseAdapterResult } from 'payload/dist/database/types';

import { BoxBlock, Page } from '@thebigrick/catalyst-payloadcms/generated-types';

export interface BlockComponentProps {
  block: NonNullable<Page['blocks']>[number] & {
    __typename?: string;
  };
}

export interface BoxComponentProps extends BlockComponentProps {
  block: BlockComponentProps['block'] & {
    box?: BoxBlock;
  };
  className?: string;
}

export type GraphQLDocsCollection<TDoc, TCollection extends string> = Record<
  TCollection,
  { docs: TDoc[] }
>;

export type GraphQLDoc<TDoc, TResource extends string> = Record<TResource, TDoc>;

export interface PageComponentDefinition {
  schema: Block;
  fragment: DocumentNode;
}

export interface DbAdapterProviderOptions {
  hasNumericId: boolean;
}
export type DbAdapterProvider = () => DatabaseAdapterResult;
export type DbAdapterProviderCollection = Record<
  string,
  [DbAdapterProvider, DbAdapterProviderOptions]
>;
