import { createContext, useContext, useState } from "react";

import { useParamFilterObject, type IFilterObjectValue } from "../../hooks/use-param-filter-object";
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
    const [paramFilterObject, setParamFilterObject] = useParamFilterObject();

    const [localFilterObject, setLocalFilterObject] = useState(paramFilterObject);

    const syncLocalFiltersWithParamFilters = () => {
        setLocalFilterObject(paramFilterObject);
    };

    const applyFilters = () => {
        setParamFilterObject(localFilterObject);
    };

    const clearParamFilters = () => {
        setParamFilterObject(null);
    };

    const clearLocalFilters = () => {
        setLocalFilterObject({});
    };

    const clearFilters = () => {
        clearParamFilters();
        clearLocalFilters();
    };

    const setLocalFilterValue = (filterId: string, value: IFilterObjectValue) => {
        if (!value) {
            const { [filterId]: _, ...rest } = localFilterObject || {};
            setLocalFilterObject(rest);
            return;
        }

        setLocalFilterObject((prev) => ({
            ...prev,
            [filterId]: value
        }));
    };

    const setParamFilterValue = (filterId: string, value: IFilterObjectValue) => {
        if (!value) {
            const { [filterId]: _, ...rest } = paramFilterObject || {};
            setParamFilterObject(rest);
            return;
        }

        const prevFilters = paramFilterObject || {};
        const newFilters = {
            ...prevFilters,
            [filterId]: value
        };
        setParamFilterObject(newFilters);
    };

    return {
        ...props,
        localFilterObject,
        paramFilterObject,
        setLocalFilterValue,
        setParamFilterValue,
        applyFilters,
        syncLocalFiltersWithParamFilters,
        clearParamFilters,
        clearLocalFilters,
        clearFilters
    };
};
