import type { PropsWithChildren } from "react";
import { FilterControllerContext, useFilterControllerProvider } from "./filter-controller-provider.hooks";

export interface IFilterInfo {
    id: string;
    type: IFilterInfoType;
}

export type IFilterInfoType = "text" | "number";

export interface IFilterControllerProps {
    filters: IFilterInfo[];
}

export function FilterControllerProvider({ children, ...props }: PropsWithChildren<IFilterControllerProps>) {
    const value = useFilterControllerProvider(props);

    return <FilterControllerContext.Provider value={value}>{children}</FilterControllerContext.Provider>;
}
