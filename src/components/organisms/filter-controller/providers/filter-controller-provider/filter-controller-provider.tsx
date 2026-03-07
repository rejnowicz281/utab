import type { ITableFilterMeta } from "@/components/organisms/tanstack-table/hooks/use-tanstack-table";
import type { PropsWithChildren } from "react";
import { FilterControllerContext, useFilterControllerProvider } from "./filter-controller-provider.hooks";

export interface IFilterInfo {
    id: string;
    meta: ITableFilterMeta;
}

export interface IFilterControllerProps {
    filters: IFilterInfo[];
}

export function FilterControllerProvider({ children, ...props }: PropsWithChildren<IFilterControllerProps>) {
    const value = useFilterControllerProvider(props);

    return <FilterControllerContext.Provider value={value}>{children}</FilterControllerContext.Provider>;
}
