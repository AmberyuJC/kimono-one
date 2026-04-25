import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";
import type { MetaFunction } from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const meta: MetaFunction = () => [
  { title: "Kimono One Harness Lab" },
  {
    name: "description",
    content:
      "Agent-first harness bootstrap for Kimono One. The repository prioritizes plans, checks, tests, and repeatable delivery.",
  },
];

export const links: Route.LinksFunction = () => [];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "请求失败";
  let details = "发生了一个未预期的错误。";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "错误";
    details =
      error.status === 404 ? "请求的页面不存在。" : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="error-shell">
      <div className="error-card">
        <p className="eyebrow">Kimono One Harness Lab</p>
        <h1>{message}</h1>
        <p>{details}</p>
      </div>
      {stack && (
        <pre className="error-stack">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
