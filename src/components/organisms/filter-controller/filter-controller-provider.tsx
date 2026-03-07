import type { ITableFilterMeta } from "@/components/organisms/tanstack-table/hooks/use-tanstack-table";
import { contextFactory } from "@/lib/context-factory";
import { useState } from "react";

import { useParamFilterObject, type IFilterObjectValue } from "./hooks/use-param-filter-object";

export interface IFilterInfo {
    id: string;
    meta: ITableFilterMeta;
}

export interface IFilterControllerProps {
    filters: IFilterInfo[];
}

const [FilterControllerProvider, useFilterControllerContext] = contextFactory((props: IFilterControllerProps) => {
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
}, "useFilterControllerContext must be used within a FilterControllerProvider");

export { FilterControllerProvider, useFilterControllerContext };
