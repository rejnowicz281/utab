import { useFilterControllerContext } from "@/components/organisms/filter-controller/filter-controller-provider";
import { Badge, type IBadgeProps } from "@/components/ui/badge";
import { Button, type IButtonProps } from "@/components/ui/button";
import { Popover, PopoverContent, type IPopoverContentProps, type IPopoverProps } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import type { ComponentProps, FC } from "react";
import { useFilterChipContext } from "./filter-chip-provider";

export const FilterChipBadge = ({ className, ...props }: IBadgeProps) => {
    return <Badge className={cn(className, "cursor-pointer")} variant="outline" {...props} />;
};

export const FilterChipBadgeClearButton: FC<ComponentProps<"button">> = ({ onClick, ...props }) => {
    const { filter, paramFilterValue, setPopoverOpen } = useFilterChipContext();
    const { setLocalFilterValue, setParamFilterValue } = useFilterControllerContext();

    if (!paramFilterValue) return null;

    return (
        <button
            className="cursor-pointer"
            onClick={(e) => {
                e.stopPropagation();

                onClick?.(e);

                setPopoverOpen(false);
            }}
            {...props}
        >
            <X
                onClick={() => {
                    setLocalFilterValue(filter.id, null);
                    setParamFilterValue(filter.id, null);
                }}
                size={18}
            />
        </button>
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
    const { applyValue, value, paramFilterValue } = useFilterChipContext();

    return (
        <Button
            onClick={(e) => {
                onClick?.(e);
                applyValue();
            }}
            disabled={JSON.stringify(value) === JSON.stringify(paramFilterValue)}
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
