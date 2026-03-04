import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ icon, className = "", ...props }, ref) => {
    return (
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted">
            {icon}
          </div>
        )}
        <input
          ref={ref}
          className={`w-full rounded-md border border-border bg-background py-2.5 font-sans text-sm text-text-primary placeholder:text-text-muted outline-none transition-colors focus:border-accent ${
            icon ? "pl-9" : "pl-3"
          } pr-3 ${className}`}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";
