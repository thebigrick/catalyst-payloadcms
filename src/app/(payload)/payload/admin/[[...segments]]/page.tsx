import { generatePageMetadata, RootPage } from '@payloadcms/next/views';
import type { Metadata } from 'next';

import config from '@payload-config';

import { importMap } from '../importMap.js';

interface Args {
  params: Promise<{
    segments: string[];
  }>;
  searchParams: Promise<Record<string, string | string[]>>;
}

export const generateMetadata = ({ params, searchParams }: Args): Promise<Metadata> =>
  generatePageMetadata({ config, params, searchParams });

const Page = ({ params, searchParams }: Args) =>
  RootPage({ config, importMap, params, searchParams });

export default Page;
