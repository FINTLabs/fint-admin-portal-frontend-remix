import React from "react";
import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction , MetaFunction} from "@remix-run/node";
import navStyles from "@navikt/ds-css/dist/index.css";
import {LayoutAppbar} from '~/components/layout-appbar';
import { Box, Page, BodyShort } from "@navikt/ds-react";
import MeApi from "~/api/me-api";
import {json} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    Link,
    useRouteError
} from "@remix-run/react";
import styles from "~/styles/main.css";
// export const links: LinksFunction = () => [
//     ...(cssBundleHref
//         ? [{ rel: "stylesheet", href: cssBundleHref },
//         { rel: "stylesheet", href: navStyles }] : []),
// ];

export const links: LinksFunction = () => [
    { rel: "stylesheet", href: navStyles },
    {rel: 'stylesheet', href: styles},
];

export async function loader(request: Request){
    const cookies = request.headers.get('Cookie');
    if (cookies === null) {
        return json({ error: "Authentication required" }, { status: 401 });
    }
    const displayName = await MeApi.fetchDisplayName(cookies);
    return json({ displayName });
}

export const meta: MetaFunction = () => {
    return [
        { title: "Admin Portal Dashboard" },
        { name: "description", content: "here is a description of my admin portal thing" },
    ];
};

export function ErrorBoundary() {
    const error = useRouteError();
    console.error(error);
    return (
        <html>
        <head>
            <title>Oh no!</title>
            <Meta />
            <Links />
        </head>
        <body>
        Something went wrong.
        <Scripts />
        </body>
        </html>
    );
}

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
              <Box padding="8" as="footer" className={"footer"}>
                  <Page.Block gutters width="lg">
                      <BodyShort><Link to={'#'}>Til Toppen</Link></BodyShort>
                      Footer from root
                  </Page.Block>
              </Box>
          }
      >
          <Box
              className={"appbar"}
              padding="8"
              as="header"
          >
              <Page.Block gutters>
                  <LayoutAppbar />
              </Page.Block>
          </Box>

          <Box
              // background="surface-alt-4-moderate"
              padding="1"
              paddingBlock="2"
              as="main"
          >
              <Page.Block gutters>
                  <Outlet />
              </Page.Block>
          </Box>
      </Page>

        <ScrollRestoration />
        <Scripts />
      {process.env.NODE_ENV === "development" && <LiveReload />}
      </body>
    </html>
  );
}
