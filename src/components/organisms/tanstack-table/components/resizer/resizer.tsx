import { cn } from "@/lib/utils";
import type { Header } from "@tanstack/react-table";
import type { ComponentProps } from "react";

interface IResizerProps extends ComponentProps<"div"> {
    header: Header<any, unknown>;
}

export function Resizer({ header, ...props }: IResizerProps) {
    return (
        <div
            className={cn(
                "ml-3 w-1 rounded-full inline-block cursor-e-resize",
                header.column.getIsResizing() ? "bg-gray-500" : "bg-black"
            )}
            onDoubleClick={header.column.resetSize}
            onMouseDown={header.getResizeHandler()}
            onTouchStart={header.getResizeHandler()}
            {...props}
        >
            <span className="invisible">|</span>
        </div>
    );
}

export function NullableResizer({ header, ...props }: IResizerProps) {
    if (header.column.columnDef.enableResizing === false) return null;

    return <Resizer header={header} {...props} />;
}
