import { createContext, useContext, useState, type SetStateAction } from "react";

import type { IFilterObjectValue } from "@/components/organisms/filter-controller/hooks/use-param-filter-object";
import { useFilterControllerContext } from "@/components/organisms/filter-controller/providers/filter-controller-provider/filter-controller-provider.hooks";
import type { IFilterChipProps } from "./filter-chip-provider";

export const FilterChipContext = createContext<ReturnType<typeof useFilterChipProvider> | undefined>(undefined);

export const useFilterChipContext = () => {
    const context = useContext(FilterChipContext);

    if (!context) throw new Error("useFilterChipContext must be used within a FilterChipProvider");

    return context;
};

export const useFilterChipProvider = (props: IFilterChipProps) => {
    const { filter } = props;

    const [popoverOpen, _setPopoverOpen] = useState(false);

    const setPopoverOpen = (value: SetStateAction<boolean>) => {
        _setPopoverOpen(value);

        if (value === true) syncValueWithParamFilterValue();
    };

    const { paramFilterObject } = useFilterControllerContext();

    const paramFilterValue = paramFilterObject[filter.id] ?? null;

    const [value, setValue] = useState<IFilterObjectValue>(paramFilterValue);
    const syncValueWithParamFilterValue = () => {
        setValue(paramFilterObject[filter.id] ?? null);
    };

    const { setLocalFilterValue, setParamFilterValue } = useFilterControllerContext();

    const clearValue = () => setValue(null);

    const applyValue = () => {
        setLocalFilterValue(filter.id, value);
        setParamFilterValue(filter.id, value);
    };

    return {
        ...props,
        paramFilterValue,
        popoverOpen,
        setPopoverOpen,
        value,
        setValue,
        clearValue,
        applyValue
    };
};
