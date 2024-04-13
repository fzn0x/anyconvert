import React, { useContext, useEffect, useMemo } from 'react'
import { withEmotionCache } from '@emotion/react'
import { GlobalStyles, mode } from '@chakra-ui/theme-tools';
import { extendTheme, ChakraProvider, cookieStorageManagerSSR } from '@chakra-ui/react'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { LinksFunction, LoaderFunction } from '@remix-run/node'

import { ServerStyleContext, ClientStyleContext } from './context'

import mainStyles from '~/styles/main.css?url'
import globalStyles from '~/styles/global.css?url'

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: "https://unpkg.com/modern-css-reset@1.4.0/dist/reset.min.css"
    },
    {
      rel: "stylesheet",
      href: mainStyles,
    },
    {
      rel: "stylesheet",
      href: globalStyles,
    }
  ]; 
}

interface DocumentProps {
  children: React.ReactNode;
}

export const loader: LoaderFunction = async ({ request }) => {
  // first time users will not have any cookies and you may not return
  // undefined here, hence ?? is necessary
  return request.headers.get('cookie') ?? '';
}

interface BrandColors {
  [key: number]: string;
}

const colors = {
  text: {
    dark: "whiteAlpha.900",
    light: "black"
  }
}

const styles = {
  global: (props: GlobalStyles) => ({
    body: {
      color: mode('black', 'whiteAlpha.900')(props),
      bg: mode('white', '#1f2028')(props),
    },
  }),
}

const theme = extendTheme({ colors, styles });

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    function getColorMode (cookies: string) {
      const match = cookies.match(new RegExp(`(^| )${CHAKRA_COOKIE_COLOR_KEY}=([^;]+)`));
      return match == null ? void 0 : match[2];
    }

    // here we can set the default color mode. If we set it to null,
    // there's no way for us to know what is the the user's preferred theme
    // so the cient will have to figure out and maybe there'll be a flash the first time the user visits us.
    const DEFAULT_COLOR_MODE: "dark" | "light" | null = 'dark';

    const CHAKRA_COOKIE_COLOR_KEY = "chakra-ui-color-mode";

    let cookies: string = useLoaderData()

    // the client get the cookies from the document 
    // because when we do a client routing, the loader can have stored an outdated value
    if (typeof document !== "undefined") {
      cookies = document.cookie;
    }

    // get and store the color mode from the cookies.
    // It'll update the cookies if there isn't any and we have set a default value
    let colorMode = useMemo(() => {
      let color = getColorMode(cookies)
      
      if (!color && DEFAULT_COLOR_MODE) {
        cookies += ` ${CHAKRA_COOKIE_COLOR_KEY}=${DEFAULT_COLOR_MODE}`;
        color = DEFAULT_COLOR_MODE;
      }
      
      return color
    }, [cookies]);

    return (
      <html
        lang="en"
        {...colorMode
          && {
              "data-theme": colorMode,
              "style": { colorScheme: colorMode },
            }
          }
      >
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <Meta />
          <Links />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(' ')}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body  
          {...colorMode && {
            className: `chakra-ui-${colorMode}`
          }}
        >
          <ChakraProvider
            colorModeManager={cookieStorageManagerSSR(cookies)}
            theme={theme}
          >
            {children}
          </ChakraProvider>
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    );
  }
);

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  )
}
