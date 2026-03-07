import { contextFactory } from "@/lib/context-factory";
import type { TableOptions } from "@tanstack/react-table";
import type { ReactNode } from "react";
import { useTanstackTable } from "./hooks/use-tanstack-table";

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

const [TanstackTableProvider, useTanstackTableContext] = contextFactory((props: ITanstackTableProps<any>) => {
    const { stickyLeft = true, stickyRight = true, tableVersion = 1, ...rest } = props;
    const value = useTanstackTable(rest.options, rest.id, tableVersion);

    return { ...value, ...rest, stickyLeft, stickyRight, tableVersion };
}, "useTanstackTableContext must be used within a TanstackTableProvider");

export { TanstackTableProvider, useTanstackTableContext };
