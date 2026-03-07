import {
    useFilterControllerContext,
    type IFilterInfo
} from "@/components/organisms/filter-controller/filter-controller-provider";
import type { IFilterObjectValue } from "@/components/organisms/filter-controller/hooks/use-param-filter-object";
import { contextFactory } from "@/lib/context-factory";
import { useState } from "react";

export interface IFilterAccordionProps {
    filter: IFilterInfo;
}

const [FilterAccordionProvider, useFilterAccordionContext] = contextFactory((props: IFilterAccordionProps) => {
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
}, "useFilterAccordionContext must be used within a FilterAccordionProvider");

export { FilterAccordionProvider, useFilterAccordionContext };
