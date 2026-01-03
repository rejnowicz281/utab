import type { TableOptions } from "@tanstack/react-table";
import type { PropsWithChildren } from "react";
import { TanstackTableContext, useTanstackTableProvider } from "./tanstack-table-provider.hooks";

export interface ITanstackTableProps<T> {
    options: TableOptions<T>;
    id: string;
    stickyLeft?: boolean;
    stickyRight?: boolean;
}

export function TanstackTableProvider<T>({
    children,
    stickyLeft = true,
    stickyRight = true,
    ...props
}: PropsWithChildren<ITanstackTableProps<T>>) {
    const value = useTanstackTableProvider({ ...props, stickyLeft, stickyRight });

    return <TanstackTableContext.Provider value={value}>{children}</TanstackTableContext.Provider>;
}
