import { Link, Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div>
      {/* <AuthStatus /> */}

      <ul>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>

      <Outlet />
    </div>
  );
};

export default Layout;
