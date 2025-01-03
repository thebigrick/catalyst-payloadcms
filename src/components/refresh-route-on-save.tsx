'use client';

import { RefreshRouteOnSave as PayloadLivePreview } from '@payloadcms/live-preview-react';
import { useRouter } from 'next/navigation.js';
import React from 'react';

import getCatalystUrl from '@thebigrick/catalyst-payloadcms/service/get-catalyst-url';

export const RefreshRouteOnSave: React.FC = () => {
  const router = useRouter();

  return <PayloadLivePreview refresh={() => router.refresh()} serverURL={getCatalystUrl()} />;
};
