import { Outlet } from "react-router";
import LightDark from "./partials/light-dark";

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_color-mix(in_oklch,_var(--primary)_18%,_transparent_82%),_transparent_38%),linear-gradient(to_bottom,_var(--background),_color-mix(in_oklch,_var(--background)_85%,_var(--muted)_15%))] text-foreground">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex w-full max-w-md flex-col items-center justify-center">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary shadow-sm ring-1 ring-border/60">
              S
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">
              Welcome!
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to continue as an Admin
            </p>
          </div>

          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </div>

      <div className="fixed right-5 bottom-5 z-50">
        <LightDark />
      </div>
    </div>
  );
};

export default AuthLayout;
