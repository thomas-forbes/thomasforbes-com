export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full min-h-screen w-screen flex-col items-center px-5 pt-10 pb-5">
      <div className="flex h-full w-full max-w-3xl flex-1 flex-col gap-8">
        {children}
        <div className="flex-1" />
        <Footer />
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="text-accent flex flex-col items-center font-mono">
      <p className="text-xs">Don&apos;t forget to sleep well</p>
      <p className="text-sm">© {new Date().getFullYear()} Thomas Forbes</p>
    </div>
  );
}
