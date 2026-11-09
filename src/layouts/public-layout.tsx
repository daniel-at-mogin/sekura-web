import { Outlet } from "react-router";

const PublicLayout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border bg-white/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="text-lg font-semibold text-foreground">Sekura</div>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <span>Home</span>
            <span>Commodities</span>
            <span>Company</span>
            <span>Contact</span>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
          © 2026 Sekura
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
