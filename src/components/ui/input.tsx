import * as React from "react";

function Input({ className = "", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={
        "flex h-9 w-full rounded-md border border-border bg-transparent px-3 py-1 text-sm " +
        "shadow-xs transition-colors placeholder:text-muted-foreground " +
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
        "disabled:cursor-not-allowed disabled:opacity-50 " +
        className
      }
      {...props}
    />
  );
}

export { Input };
