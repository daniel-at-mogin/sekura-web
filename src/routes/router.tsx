import Loadable from "@/layouts/partials/loadable";
import { lazy } from "react";
import { createBrowserRouter, type RouteObject } from "react-router";

// Layouts
const AuthLayout = Loadable(lazy(() => import("../layouts/auth-layout")));
const DashboardLayout = Loadable(lazy(() => import("../layouts/admin-layout")));
const PublicLayout = Loadable(lazy(() => import("../layouts/public-layout")));

// Pages - Public
const Home = Loadable(lazy(() => import("../pages/home")));
const Commodities = Loadable(lazy(() => import("../pages/commodities")));
const Company = Loadable(lazy(() => import("../pages/company")));
const Contact = Loadable(lazy(() => import("../pages/contact")));
const NotFound = Loadable(lazy(() => import("../pages/not_found")));

// Pages - Admin
const AdminHome = Loadable(lazy(() => import("../pages/admin/home")));
const AdminNews = Loadable(lazy(() => import("../pages/admin/news")));
const AdminCreateNews = Loadable(
  lazy(() => import("../pages/admin/create-news")),
);

// Authentication
const Login = Loadable(lazy(() => import("../pages/admin/auth")));

const Router: RouteObject[] = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "commodities", element: <Commodities /> },
      { path: "company", element: <Company /> },
      { path: "contact", element: <Contact /> },
    ],
  },

  {
    path: "/admin",
    children: [
      {
        element: <AuthLayout />,
        children: [{ path: "auth", element: <Login /> }],
      },
      {
        element: <DashboardLayout />,
        children: [
          { path: "home", element: <AdminHome /> },
          {
            path: "news",
            children: [
              { index: true, element: <AdminNews /> },
              { path: "create", element: <AdminCreateNews /> },
            ],
          },
        ],
      },
    ],
  },

  { path: "*", element: <NotFound /> },
];

const router = createBrowserRouter(Router);

export default router;
