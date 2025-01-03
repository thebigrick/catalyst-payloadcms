import React from 'react';

import ChildrenBlocks from '@thebigrick/catalyst-payloadcms/components/children-blocks';
import { RefreshRouteOnSave } from '@thebigrick/catalyst-payloadcms/components/refresh-route-on-save';
import getPageById from '@thebigrick/catalyst-payloadcms/service/get-page-by-id';

export interface PayloadPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function Home({ params }: PayloadPageProps) {
  const { id, locale } = await params;

  const { blocks } = await getPageById(id, locale, { draft: true });

  return (
    <>
      <RefreshRouteOnSave />
      <ChildrenBlocks blocks={blocks} />
    </>
  );
}

export const generateMetadata = async ({ params }: PayloadPageProps) => {
  const { id, locale } = await params;
  const page = await getPageById(id, locale, { draft: true });

  return {
    title: page.title,
    description: page.seo?.description,
    keywords: page.seo?.keywords,
  };
};
