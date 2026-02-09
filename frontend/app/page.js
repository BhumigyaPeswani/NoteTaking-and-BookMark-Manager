import Link from "next/link";
import Container from "@/components/Container";
import { FileText, Bookmark } from "lucide-react";

export default function Home() {
  return (
    <Container className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
        Your thoughts, organized.
      </h1>
      <p className="text-lg text-muted max-w-md mb-10">
        A minimal space for your notes and bookmarks. Simple, calm, and focused on what matters.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/notes"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
          style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
        >
          <FileText className="w-4 h-4" />
          Go to Notes
        </Link>
        <Link
          href="/bookmarks"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors"
          style={{ border: '1px solid var(--border)' }}
        >
          <Bookmark className="w-4 h-4" />
          Go to Bookmarks
        </Link>
      </div>
    </Container>
  );
}
