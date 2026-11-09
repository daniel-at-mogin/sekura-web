import { useState } from "react";
import { Copy, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";

interface NewsJsonPreviewProps {
  data: Record<string, unknown> | null;
}

export function NewsJsonPreview({ data }: NewsJsonPreviewProps) {
  const [copied, setCopied] = useState(false);

  if (!data) {
    return (
      <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-border bg-muted/20 p-6 text-center text-muted-foreground">
        <FileText className="mb-3 size-10 opacity-70" />
        <p className="text-base font-medium text-foreground">
          No submission yet
        </p>
        <p className="mt-1 text-sm">
          Submit the form to preview the article payload here.
        </p>
      </div>
    );
  }

  const content = JSON.stringify(data, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          JSON Output
        </h3>

        <Button type="button" variant="outline" size="sm" onClick={handleCopy}>
          <Copy className="mr-2 size-4" />
          {copied ? "Copied" : "Copy JSON"}
        </Button>
      </div>

      <pre className="max-h-[640px] overflow-auto rounded-xl border border-border bg-muted/20 p-4 text-xs leading-6 text-foreground whitespace-pre-wrap break-words">
        {content}
      </pre>
    </div>
  );
}
