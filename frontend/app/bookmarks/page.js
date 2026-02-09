import Container from "@/components/Container";
import EmptyState from "@/components/EmptyState";
import { Bookmark, Plus } from "lucide-react";

export const metadata = {
    title: "Bookmarks - Draftly",
    description: "View and manage your bookmarks.",
};

export default function BookmarksPage() {
    return (
        <Container>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl font-medium">Bookmarks</h1>
                <button
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm hover:opacity-90 transition-opacity"
                    style={{ backgroundColor: 'var(--foreground)', color: 'var(--background)' }}
                >
                    <Plus className="w-4 h-4" />
                    Add Bookmark
                </button>
            </div>
            <EmptyState
                icon={Bookmark}
                title="No bookmarks yet"
                description="Click 'Add Bookmark' to save your first link."
            />
        </Container>
    );
}
