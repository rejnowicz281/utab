import { createContext, useContext } from "react";
import { useTanstackTable } from "../../hooks/use-tanstack-table";
import type { ITanstackTableProps } from "./tanstack-table-provider";

export const TanstackTableContext = createContext<ReturnType<typeof useTanstackTableProvider<any>> | undefined>(
    undefined
);

export const useTanstackTableContext = () => {
    const context = useContext(TanstackTableContext);

    if (!context) throw new Error("useTanstackTableContext must be used within a TanstackTableProvider");

    return context;
};

export function useTanstackTableProvider<T>(props: ITanstackTableProps<T>) {
    // Could be memoized
    const value = useTanstackTable(props.options);

    return {
        ...value,
        ...props
    };
}
