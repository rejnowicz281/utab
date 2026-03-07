import type { IFilterInfo } from "@/components/organisms/filter-controller/filter-controller-provider";
import { useState, type SetStateAction } from "react";

import { useFilterControllerContext } from "@/components/organisms/filter-controller/filter-controller-provider";
import type { IFilterObjectValue } from "@/components/organisms/filter-controller/hooks/use-param-filter-object";
import { contextFactory } from "@/lib/context-factory";

export interface IFilterChipProps {
    filter: IFilterInfo;
}

const [FilterChipProvider, useFilterChipContext] = contextFactory((props: IFilterChipProps) => {
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
}, "useFilterChipContext must be used within a FilterChipProvider");

export { FilterChipProvider, useFilterChipContext };
