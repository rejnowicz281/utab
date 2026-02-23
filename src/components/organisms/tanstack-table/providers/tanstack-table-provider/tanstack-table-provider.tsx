import type { TableOptions } from "@tanstack/react-table";
import type { PropsWithChildren, ReactNode } from "react";
import { TanstackTableContext, useTanstackTableProvider } from "./tanstack-table-provider.hooks";

export interface ITanstackTableProps<T> {
    options: TableOptions<T>; // Options for the useReactTable hook
    id: string; // Unique ID for the table
    stickyLeft?: boolean; // Whether the first column is sticky
    stickyRight?: boolean; // Whether the last column is sticky
    tableVersion?: number;
    /*
    Version number for the table to reset local storage states when the table structure changes.
    The default is 1. Increment ONLY BY ONE(!) when there are breaking changes to the table structure (e.g., columns added/removed/renamed).
    */
    selectedRowsActions?: ReactNode;
    totalCount?: number;
    classNames?: {
        outerContainer?: string;
    };
}

export function TanstackTableProvider<T>({
    children,
    stickyLeft = true,
    stickyRight = true,
    tableVersion = 1,
    selectedRowsActions,
    ...props
}: PropsWithChildren<ITanstackTableProps<T>>) {
    const value = useTanstackTableProvider({ ...props, stickyLeft, stickyRight, tableVersion, selectedRowsActions });

    return <TanstackTableContext.Provider value={value}>{children}</TanstackTableContext.Provider>;
}
