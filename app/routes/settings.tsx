import { Link, Outlet } from "react-router";

export default function Settings() {
  return (
    <div>
      settings
      <nav>
        <Link to="/settings/app">App settings</Link>
        <Link to="/settings/profile">Profile settings</Link>
      </nav>
      <Outlet />
    </div>
  );
}
