import type { IFilterInfo } from "@/components/organisms/filter-controller/providers/filter-controller-provider/filter-controller-provider";
import type { PropsWithChildren } from "react";
import { FilterAccordionContext, useFilterAccordionProvider } from "./filter-accordion-provider.hooks";

export interface IFilterAccordionProps {
    filter: IFilterInfo;
}

export function FilterAccordionProvider({ children, ...props }: PropsWithChildren<IFilterAccordionProps>) {
    const value = useFilterAccordionProvider(props);

    return <FilterAccordionContext.Provider value={value}>{children}</FilterAccordionContext.Provider>;
}
