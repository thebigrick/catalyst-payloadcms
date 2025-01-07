import type { ServerFunctionClient } from 'payload';

import '@payloadcms/next/css';
import React from 'react';

import config from '@payload-config';

import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts';

import { importMap } from './admin/importMap.js';
import './custom.scss';

interface Args {
  children: React.ReactNode;
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server';

  return handleServerFunctions({
    ...args,
    config,
    importMap,
  });
};

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
);

export default Layout;
