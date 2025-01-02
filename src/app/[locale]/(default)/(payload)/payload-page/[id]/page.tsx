import getDocument from '@thebigrick/catalyst-payloadcms/service/get-document';
import ChildrenBlocks from "@thebigrick/catalyst-payloadcms/components/ChildrenBlocks";
import React from "react";

export interface PayloadPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function Home({ params }: PayloadPageProps) {
  const { id, locale } = await params;

  const { blocks } = await getDocument('page', locale, id);

  return <ChildrenBlocks blocks={blocks} />;
}

export const generateMetadata = async ({ params }: PayloadPageProps) => {
    const { id, locale } = await params;
    const page = await getDocument('page', locale, id);

    return {
        title: page.title,
        description: page.seo.description,
        keywords: page.seo.keywords,
    };
}

