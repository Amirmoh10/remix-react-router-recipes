import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import {
  DiscoverIcon,
  HomeIcon,
  RecipeBookIcon,
  SettingsIcon,
} from "./components/icons";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Remix recipes" },
    { name: "description", content: "Welcome to Remix Recipes!" },
  ];
}

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className=" flex h-screen">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <>
      <nav className="bg-black text-white">
        <ul className="flex flex-col">
          <li>
            <AppNavLink to="/">
              <HomeIcon />
            </AppNavLink>
          </li>
          <li>
            <AppNavLink to="/settings">
              <SettingsIcon />
            </AppNavLink>
          </li>
          <li>
            <AppNavLink to="/discover">
              <DiscoverIcon />
            </AppNavLink>
          </li>
          <li>
            <AppNavLink to="/app">
              <RecipeBookIcon />
            </AppNavLink>
          </li>
        </ul>
      </nav>
      <div className="p-4 w-full md:w-[calc(100%-4rem)]">
        <Outlet />
      </div>
    </>
  );
}

function AppNavLink(porps: { children: React.ReactNode; to: string }) {
  const { children, to } = porps;
  return (
    <li className="w-16">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `py-4 flex justify-center hover:bg-gray-800 ${
            isActive ? "bg-gray-700" : ""
          }`
        }
      >
        {children}
      </NavLink>
    </li>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
