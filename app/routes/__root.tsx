import PageLayout from '@/components/PageLayout/PageLayout';
import appStyles from '@/styles/app.css?url';
import { createRootRoute, HeadContent, Outlet, Scripts } from '@tanstack/react-router';
import type { ReactNode } from 'react';
import { useDarkMode } from 'usehooks-ts';

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'TanStack Start Starter',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appStyles,
      },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { isDarkMode } = useDarkMode();

  return (
    <html className={isDarkMode ? 'dark' : 'light'} lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="bg-linear-to-r dark:from-indigo-950 dark:via-purple-950 dark:to-pink-950 from-indigo-200 via-purple-200 to-pink-200">
        <PageLayout>{children}</PageLayout>
        <Scripts />
      </body>
    </html>
  );
}
