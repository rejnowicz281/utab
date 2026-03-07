import { Input, InputClearIcon, InputDiv, type IInputClearIcon, type IInputProps } from "@/components/ui/input";
import { PopoverTrigger } from "@/components/ui/popover";

import {
    FilterChipBadge,
    FilterChipBadgeClearButton,
    FilterChipPopover,
    FilterChipPopoverApplyButton,
    FilterChipPopoverBody,
    FilterChipPopoverClearButton,
    FilterChipPopoverContent,
    FilterChipPopoverFooter
} from "../filter-chip";
import { FilterChipProvider, type IFilterChipProps } from "../providers/filter-chip-provider/filter-chip-provider";
import { useFilterChipContext } from "../providers/filter-chip-provider/filter-chip-provider.hooks";

export const TextFilterChip = ({ type, ...props }: IFilterChipProps & { type?: IInputProps["type"] }) => {
    const { filter } = props;

    return (
        <FilterChipProvider {...props}>
            <FilterChipPopover>
                <PopoverTrigger asChild>
                    <FilterChipBadge>
                        {filter.id}
                        <FilterChipBadgeClearButton />
                    </FilterChipBadge>
                </PopoverTrigger>
                <FilterChipPopoverContent>
                    <FilterChipPopoverBody>
                        <InputDiv>
                            <TextFilterChipInput type={type} />
                            <TextFilterChipInputClearIcon />
                        </InputDiv>
                        <FilterChipPopoverFooter>
                            <FilterChipPopoverClearButton />
                            <FilterChipPopoverApplyButton />
                        </FilterChipPopoverFooter>
                    </FilterChipPopoverBody>
                </FilterChipPopoverContent>
            </FilterChipPopover>
        </FilterChipProvider>
    );
};

export const TextFilterChipInput = (props: IInputProps) => {
    const { value, setValue } = useFilterChipContext();

    return (
        <Input
            variant={value ? "icon-right" : undefined}
            value={(value as string) || ""}
            onChange={(e) => setValue(e.target.value)}
            {...props}
        />
    );
};

export const TextFilterChipInputClearIcon = ({ onClick, ...props }: IInputClearIcon) => {
    const { value, clearValue } = useFilterChipContext();

    if (!value) return null;

    return (
        <InputClearIcon
            onClick={(e) => {
                onClick?.(e);
                clearValue();
            }}
            {...props}
        />
    );
};
