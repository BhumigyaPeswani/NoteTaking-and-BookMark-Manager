import { FileText } from "lucide-react";

export default function EmptyState({
    icon: Icon = FileText,
    title = "Nothing here yet",
    description = "Get started by creating your first item."
}) {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-12 h-12 rounded-full bg-border/50 flex items-center justify-center mb-4">
                <Icon className="w-6 h-6 text-muted" />
            </div>
            <h3 className="text-lg font-medium mb-2">{title}</h3>
            <p className="text-sm text-muted max-w-xs">{description}</p>
        </div>
    );
}
