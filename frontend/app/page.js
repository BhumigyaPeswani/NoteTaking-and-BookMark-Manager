import Link from "next/link";
import Container from "@/components/Container";
import { FileText, Bookmark } from "lucide-react";

export default function Home() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1
        className="text-3xl md:text-4xl font-semibold mb-4"
        style={{ color: 'var(--foreground)', letterSpacing: '-0.02em', lineHeight: 1.2 }}
      >
        Your thoughts, organized.
      </h1>
      <p
        className="text-base max-w-md mb-10"
        style={{ color: 'var(--muted)', lineHeight: 1.7 }}
      >
        A minimal space for your notes and bookmarks. Simple, calm, and focused on what matters.
      </p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Link
          href="/notes"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm"
          style={{ backgroundColor: 'var(--accent)', color: '#FFFFFF' }}
        >
          <FileText className="w-4 h-4" />
          Go to Notes
        </Link>
        <Link
          href="/bookmarks"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm"
          style={{
            backgroundColor: 'var(--surface)',
            border: '1px solid var(--border)',
            color: 'var(--foreground)'
          }}
        >
          <Bookmark className="w-4 h-4" />
          Go to Bookmarks
        </Link>
      </div>
    </Container>
  );
}
