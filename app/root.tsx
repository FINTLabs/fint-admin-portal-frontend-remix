import React from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css";
import {LayoutAppbar} from '~/components/layout-appbar';
import { Box, Page } from "@navikt/ds-react";

import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";


export const links: LinksFunction = () => [
    ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }, { rel: "stylesheet", href: navStyles }] : []),
];


export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>

      <Page
          footer={
              <Box background="surface-neutral-moderate" padding="8" as="footer">
                  <Page.Block gutters width="lg">
                      Footer from root
                  </Page.Block>
              </Box>
          }
      >
          <Box background="surface-neutral-moderate" padding="8" as="header">
              <Page.Block gutters>
                  <LayoutAppbar />
              </Page.Block>
          </Box>

          <Box
              // background="surface-alt-4-moderate"
              padding="1"
              paddingBlock="16"
              as="main"
          >
              <Page.Block gutters>
                  <Outlet />
              </Page.Block>
          </Box>
      </Page>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
