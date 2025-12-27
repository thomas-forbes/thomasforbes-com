import { ThemeButton } from '@/app/(page)/theme-button';
import Navbar from '@/components/navbar';
import { NoiseCanvas } from '@/components/noise-canvas';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NoiseCanvas />
      <div className="flex h-full min-h-dvh w-screen flex-col items-center px-5 pt-10 pb-5">
        <div className="flex h-full w-full max-w-3xl flex-1 flex-col gap-8">
          <Navbar />
          {children}
          <div className="flex-1" />
          <Footer />
        </div>
      </div>
      <ThemeButton />
    </>
  );
}

function Footer() {
  return (
    <div className="text-accent flex flex-col items-center font-mono">
      <p className="text-xs">Don&apos;t forget to sleep well tonight</p>
      <p className="text-sm">© {new Date().getFullYear()} Thomas Forbes</p>
    </div>
  );
}
