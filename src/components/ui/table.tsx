import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "./button";

function Table({
    className,
    containerProps: _containerProps,
    ...props
}: React.ComponentProps<"table"> & {
    containerProps?: React.ComponentProps<"div">;
}) {
    const { className: containerClassName, children: containerChildren, ...containerProps } = _containerProps || {};

    return (
        <div
            data-slot="table-container"
            className={cn("relative w-full overflow-x-auto", containerClassName)}
            {...containerProps}
        >
            <table
                data-slot="table"
                className={cn("w-full border-separate border-spacing-0 caption-bottom text-sm", className)}
                {...props}
            />
            {containerChildren}
        </div>
    );
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
    return <thead data-slot="table-header" className={className} {...props} />;
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
    return <tbody data-slot="table-body" className={className} {...props} />;
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
    return (
        <tfoot
            data-slot="table-footer"
            className={cn("bg-white border-t font-medium [&>tr]:last:border-b-0", className)}
            {...props}
        />
    );
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
    return <tr data-slot="table-row" className={cn("bg-white border-b transition-colors", className)} {...props} />;
}

type ITableHeadProps = React.ComponentProps<"th"> & {
    sticky?: "left" | "right";
};
function TableHead({ className, sticky, ...props }: ITableHeadProps) {
    return (
        <th
            data-slot="table-head"
            className={cn(
                "border-b text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap",
                sticky === "left" && "sticky top-0 left-0 bg-white",
                sticky === "right" && "sticky top-0 right-0 bg-white",
                className
            )}
            {...props}
        />
    );
}

type ITableCellProps = React.ComponentProps<"td"> & {
    sticky?: "left" | "right";
};

function TableCell({ className, sticky, ...props }: ITableCellProps) {
    return (
        <td
            data-slot="table-cell"
            className={cn(
                "p-2 align-middle whitespace-nowrap",
                sticky === "left" && "sticky top-0 left-0 bg-white",
                sticky === "right" && "sticky top-0 right-0 bg-white",
                className
            )}
            {...props}
        />
    );
}

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
    return (
        <caption data-slot="table-caption" className={cn("text-muted-foreground mt-4 text-sm", className)} {...props} />
    );
}

function TableNavigation({ className, ...props }: React.ComponentProps<"div">) {
    return (
        <div
            role="region"
            className={cn("sticky flex items-center flex-wrap gap-2 left-0 justify-between p-2 border-t", className)}
            {...props}
        >
            <span>Total items: 1</span>
            <div className="flex items-center gap-2">
                <span>Page: 1 of 5</span>
                <Button variant="outline">
                    <ChevronLeft />
                </Button>
                <Button variant="outline">
                    <ChevronRight />
                </Button>
            </div>
        </div>
    );
}

export { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableNavigation, TableRow };
