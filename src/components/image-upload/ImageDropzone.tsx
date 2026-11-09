import { ImageIcon, X } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "cn";

import { Button } from "@/components/ui/button";

interface ImageDropzoneProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  disabled?: boolean;
}

const ACCEPTED_IMAGE_TYPES = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
};

export function ImageDropzone({
  value,
  onChange,
  error,
  disabled,
}: ImageDropzoneProps) {
  const previewUrl = useMemo(() => {
    if (!value) {
      return null;
    }

    return URL.createObjectURL(value);
  }, [value]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept: ACCEPTED_IMAGE_TYPES,
      multiple: false,
      maxFiles: 1,
      maxSize: 5 * 1024 * 1024,
      disabled,
      onDrop: (acceptedFiles) => {
        const file = acceptedFiles[0] ?? null;
        onChange(file);
      },
    });

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={cn(
          "relative flex min-h-56 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed border-input bg-muted/20 p-4 transition-all duration-200",
          isDragActive && "border-primary bg-primary/5",
          isDragReject && "border-destructive bg-destructive/5",
          error && "border-destructive bg-destructive/5",
          disabled && "cursor-not-allowed opacity-60",
        )}
      >
        <input {...getInputProps()} />

        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Cover preview"
              className="h-44 w-full rounded-lg object-cover"
            />

            <div className="mt-3 flex w-full items-center justify-between gap-3 rounded-lg border border-border bg-background/80 px-3 py-2 text-left">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-foreground">
                  {value?.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {(value?.size ?? 0 / 1024).toFixed(0)} KB
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon-sm"
                className="shrink-0"
                onClick={(event) => {
                  event.stopPropagation();
                  onChange(null);
                }}
              >
                <X className="size-4" />
              </Button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-background text-muted-foreground shadow-sm ring-1 ring-border">
              <ImageIcon className="size-5" />
            </div>
            <p className="text-sm font-medium text-foreground">
              {isDragActive ? "Drop the image here" : "Upload cover image"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              PNG, JPG, WEBP, or GIF · Max 5 MB
            </p>
          </div>
        )}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
