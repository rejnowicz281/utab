import type { IFilterInfo } from "@/components/organisms/filter-controller/providers/filter-controller-provider/filter-controller-provider";
import type { PropsWithChildren } from "react";
import { FilterChipContext, useFilterChipProvider } from "./filter-chip-provider.hooks";

export interface IFilterChipProps {
    filter: IFilterInfo;
}

export function FilterChipProvider({ children, ...props }: PropsWithChildren<IFilterChipProps>) {
    const value = useFilterChipProvider(props);

    return <FilterChipContext.Provider value={value}>{children}</FilterChipContext.Provider>;
}
