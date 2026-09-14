import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange?: (value: string) => void;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, children, onValueChange, value, defaultValue, ...props }, ref) => (
    <select
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      onChange={(event) => {
        onValueChange?.(event.target.value);
        if (props.onChange) props.onChange(event);
      }}
      className={cn(
        "flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-xs shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50 font-mono text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </select>
  )
);
Select.displayName = "Select";

const SelectTrigger = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("relative", className)} {...props}>
      {children}
    </div>
  )
);
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("mt-1 rounded-md border border-border bg-background p-1 shadow-md", className)} {...props}>
      {children}
    </div>
  )
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef<HTMLOptionElement, React.OptionHTMLAttributes<HTMLOptionElement>>(
  ({ className, children, ...props }, ref) => (
    <option ref={ref} className={cn("rounded-sm px-2 py-1 text-xs", className)} {...props}>
      {children}
    </option>
  )
);
SelectItem.displayName = "SelectItem";

const SelectValue = ({ placeholder }: { placeholder?: string }) => <span>{placeholder}</span>;

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };
