import { useFilterControllerContext } from "@/components/organisms/filter-controller/providers/filter-controller-provider/filter-controller-provider.hooks";
import { Badge, type IBadgeProps } from "@/components/ui/badge";
import { Button, type IButtonProps } from "@/components/ui/button";
import { Popover, PopoverContent, type IPopoverContentProps, type IPopoverProps } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { X, type LucideProps } from "lucide-react";
import type { FC } from "react";
import { useFilterChipContext } from "./providers/filter-chip-provider/filter-chip-provider.hooks";

export const FilterChipBadge = ({ className, ...props }: IBadgeProps) => {
    return <Badge className={cn(className, "cursor-pointer")} variant="outline" {...props} />;
};

export const FilterChipBadgeClearIcon: FC<LucideProps> = ({ onClick, ...props }) => {
    const { filter, paramFilterValue } = useFilterChipContext();
    const { setLocalFilterValue, setParamFilterValue } = useFilterControllerContext();

    if (!paramFilterValue) return null;

    return (
        <X
            onClick={(e) => {
                onClick?.(e);
                setLocalFilterValue(filter.id, null);
                setParamFilterValue(filter.id, null);
            }}
            {...props}
        />
    );
};

export const FilterChipPopover = (props: IPopoverProps) => {
    const { popoverOpen, setPopoverOpen } = useFilterChipContext();

    return <Popover open={popoverOpen} onOpenChange={setPopoverOpen} {...props} />;
};

export const FilterChipPopoverContent = (props: IPopoverContentProps) => {
    return <PopoverContent align="start" {...props} />;
};

export const FilterChipPopoverBody = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn("flex flex-col gap-4", className)} {...props} />;
};

export const FilterChipPopoverFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
    return <div className={cn("flex justify-end gap-2", className)} {...props} />;
};

export const FilterChipPopoverApplyButton = ({ onClick, ...props }: IButtonProps) => {
    const { applyValue, value, localFilterValue } = useFilterChipContext();

    return (
        <Button
            onClick={(e) => {
                onClick?.(e);
                applyValue();
            }}
            disabled={JSON.stringify(value) === JSON.stringify(localFilterValue)}
            children="Apply"
            {...props}
        />
    );
};

export const FilterChipPopoverClearButton = ({ onClick, ...props }: IButtonProps) => {
    const { clearValue, value } = useFilterChipContext();

    return (
        <Button
            disabled={!value}
            onClick={(e) => {
                onClick?.(e);
                clearValue();
            }}
            children="Clear"
            variant="ghost"
            {...props}
        />
    );
};
