import { Link } from '@/components/ui/link';
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative space-y-4">
      <Link href="/" className="font-mono text-sm text-nowrap md:text-base">
        /index
      </Link>
      {children}
    </div>
  );
}
