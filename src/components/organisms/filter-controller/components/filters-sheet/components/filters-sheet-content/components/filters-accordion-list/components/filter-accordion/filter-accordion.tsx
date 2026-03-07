import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { ChevronDown, type LucideProps } from "lucide-react";
import type { ComponentProps } from "react";
import { useFilterAccordionContext } from "./providers/filter-accordion-provider/filter-accordion-provider.hooks";

export const FilterAccordion = (props: ComponentProps<"div">) => {
    return <div className="border-t" {...props} />;
};

export const FilterAccordionContent = ({ className, ...props }: ComponentProps<"div">) => {
    const { accordionOpen } = useFilterAccordionContext();

    if (!accordionOpen) return null;

    return <div className="px-4 pb-4" {...props} />;
};

export const FilterAccordionAnchor = ({ className, ...props }: LucideProps) => {
    const { accordionOpen } = useFilterAccordionContext();

    return <ChevronDown className={cn(className, accordionOpen ? "rotate-180" : undefined)} {...props} />;
};

export interface IFilterAccordionTriggerProps extends React.ComponentPropsWithoutRef<"div"> {
    asChild?: boolean;
}
export function FilterAccordionTrigger({
    className,
    onClick,
    asChild = false,
    ...props
}: IFilterAccordionTriggerProps) {
    const { setAccordionOpen } = useFilterAccordionContext();

    const Comp = asChild ? Slot : "div";

    return (
        <Comp
            onClick={(e) => {
                onClick?.(e);
                setAccordionOpen((prev) => !prev);
            }}
            className={cn(className, "flex items-center gap-2 justify-between px-4 py-2 cursor-pointer")}
            data-slot="filter-accordion-trigger"
            {...props}
        />
    );
}
