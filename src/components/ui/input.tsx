import * as React from "react";

import { cn } from "@/lib/utils";
import { Search, X, type LucideProps } from "lucide-react";

function InputDiv({ className, ...props }: React.ComponentProps<"div">) {
    return <div data-slot="input-div" className={cn("relative", className)} {...props} />;
}

function InputLeftIcon({ className, component, ...props }: LucideProps & { component?: React.ElementType }) {
    const IconComponent = component || Search;

    return (
        <IconComponent
            {...props}
            className={cn("h-4 w-4 absolute left-2.5 top-2.5 text-muted-foreground", className)}
        />
    );
}

export interface IInputClearIcon extends LucideProps {
    component?: React.ElementType;
}
function InputClearIcon({ className, component, ...props }: IInputClearIcon) {
    const IconComponent = component || X;

    return (
        <IconComponent
            {...props}
            className={cn("h-4 w-4 absolute right-2.5 top-2.5 text-muted-foreground cursor-pointer", className)}
        />
    );
}

export type IInputProps = React.ComponentProps<"input"> & {
    variant?: "default" | "icon-left" | "icon-right" | "icon-both";
};
function Input({ className, type, variant = "default", ...props }: IInputProps) {
    return (
        <input
            type={type}
            data-slot="input"
            className={cn(
                "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
                "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                variant === "icon-left" && "pl-9",
                variant === "icon-right" && "pr-9",
                variant === "icon-both" && "pl-9 pr-9",
                className
            )}
            {...props}
        />
    );
}

export { Input, InputClearIcon, InputDiv, InputLeftIcon };
