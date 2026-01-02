import type { TableOptions } from "@tanstack/react-table";
import type { PropsWithChildren } from "react";
import { TanstackTableContext, useTanstackTableProvider } from "./tanstack-table-provider.hooks";

export interface ITanstackTableProps<T> {
    options: TableOptions<T>;
    id: string;
    stickyLeft?: boolean;
    stickyRight?: boolean;
}

export function TanstackTableProvider<T>({ children, ...props }: PropsWithChildren<ITanstackTableProps<T>>) {
    const value = useTanstackTableProvider(props);

    return <TanstackTableContext.Provider value={value}>{children}</TanstackTableContext.Provider>;
}
