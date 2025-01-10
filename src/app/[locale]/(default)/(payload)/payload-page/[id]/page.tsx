import React from 'react';

import ChildrenBlocks from '@thebigrick/catalyst-payloadcms/components/children-blocks';
import getPageById from '@thebigrick/catalyst-payloadcms/service/get-page-by-id';

export interface PayloadPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function Home({ params }: PayloadPageProps) {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  const id = parseInt(awaitedParams.id, 10);
  const { blocks } = await getPageById(id, locale);

  return <ChildrenBlocks blocks={blocks} />;
}

export const generateMetadata = async ({ params }: PayloadPageProps) => {
  const awaitedParams = await params;
  const locale = awaitedParams.locale;
  const id = parseInt(awaitedParams.id, 10);
  const page = await getPageById(id, locale);

  return {
    title: page.title,
    description: page.seo?.description,
    keywords: page.seo?.keywords,
  };
};
