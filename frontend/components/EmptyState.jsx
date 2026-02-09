import { FileText } from "lucide-react";

export default function EmptyState({
    icon: Icon = FileText,
    title = "Nothing here yet",
    description = "Get started by creating your first item."
}) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: 'var(--background)' }}
            >
                <Icon className="w-5 h-5" style={{ color: 'var(--muted)' }} />
            </div>
            <h3
                className="text-base font-medium mb-1.5"
                style={{ color: 'var(--foreground)' }}
            >
                {title}
            </h3>
            <p
                className="text-sm max-w-xs"
                style={{ color: 'var(--muted)', lineHeight: 1.6 }}
            >
                {description}
            </p>
        </div>
    );
}
