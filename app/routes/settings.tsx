import { Suspense } from "react";
import { Await, Link, Outlet, useLoaderData, useLocation } from "react-router";
import type { Route } from "./+types/settings";

export function loader({ params }: Route.LoaderArgs) {
  const response = new Promise((resolve, reject) =>
    setTimeout(() => reject("Setting page data"), 1000)
  );

  return { response };
}

export default function Settings() {
  const data = useLoaderData<typeof loader>();
  const location = useLocation();

  return (
    <div>
      Settings!!
      <Suspense fallback={<div>Loading...</div>} key={location.pathname}>
        <Await resolve={data.response}>
          {(resolvedData) => <div>{resolvedData}</div>}
        </Await>
      </Suspense>
      <nav>
        <Link to="/settings/app">App settings</Link>
        <Link to="/settings/profile">Profile settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  if (error instanceof Error) {
    return <div>{error.message}</div>;
  }

  return <div>Generic error</div>;
}
