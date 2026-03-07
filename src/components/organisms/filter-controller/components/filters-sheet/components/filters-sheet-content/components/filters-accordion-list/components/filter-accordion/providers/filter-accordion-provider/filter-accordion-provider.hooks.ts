import { createContext, useContext, useState } from "react";

import type { IFilterObjectValue } from "@/components/organisms/filter-controller/hooks/use-param-filter-object";
import { useFilterControllerContext } from "@/components/organisms/filter-controller/providers/filter-controller-provider/filter-controller-provider.hooks";
import type { IFilterAccordionProps } from "./filter-accordion-provider";

export const FilterAccordionContext = createContext<ReturnType<typeof useFilterAccordionProvider> | undefined>(
    undefined
);

export const useFilterAccordionContext = () => {
    const context = useContext(FilterAccordionContext);

    if (!context) throw new Error("useFilterAccordionContext must be used within a FilterAccordionProvider");

    return context;
};

export const useFilterAccordionProvider = (props: IFilterAccordionProps) => {
    const { filter } = props;

    const [accordionOpen, setAccordionOpen] = useState(false);
    const { localFilterObject, setLocalFilterValue } = useFilterControllerContext();

    const value = localFilterObject[filter.id];
    const setValue = (value: IFilterObjectValue) => setLocalFilterValue(filter.id, value);
    const clearValue = () => setValue(null);

    return {
        ...props,
        value,
        setValue,
        clearValue,
        accordionOpen,
        setAccordionOpen
    };
};
