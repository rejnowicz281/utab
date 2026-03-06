import { createContext, useContext } from "react";
import type { IFilterControllerProps } from "./filter-controller-provider";

export const FilterControllerContext = createContext<ReturnType<typeof useFilterControllerProvider> | undefined>(
    undefined
);

export const useFilterControllerContext = () => {
    const context = useContext(FilterControllerContext);

    if (!context) throw new Error("useFilterControllerContext must be used within a FilterControllerProvider");

    return context;
};

export const useFilterControllerProvider = (props: IFilterControllerProps) => {
    return props;
};
