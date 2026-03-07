import { Input, InputClearIcon, InputDiv, type IInputClearIcon, type IInputProps } from "@/components/ui/input";

import {
    FilterAccordion,
    FilterAccordionAnchor,
    FilterAccordionCheckmark,
    FilterAccordionContent,
    FilterAccordionTrigger,
    FilterAccordionTriggerBody
} from "../filter-accordion";
import {
    FilterAccordionProvider,
    type IFilterAccordionProps
} from "../providers/filter-accordion-provider/filter-accordion-provider";
import { useFilterAccordionContext } from "../providers/filter-accordion-provider/filter-accordion-provider.hooks";

export const TextFilterAccordion = ({ type, ...props }: IFilterAccordionProps & { type?: IInputProps["type"] }) => {
    const { filter } = props;

    return (
        <FilterAccordionProvider {...props}>
            <FilterAccordion>
                <FilterAccordionTrigger>
                    <FilterAccordionTriggerBody>
                        <FilterAccordionCheckmark />
                        {filter.id}
                    </FilterAccordionTriggerBody>
                    <FilterAccordionAnchor />
                </FilterAccordionTrigger>
                <FilterAccordionContent>
                    <InputDiv>
                        <TextFilterAccordionInput type={type} />
                        <TextFilterAccordionInputClearIcon />
                    </InputDiv>
                </FilterAccordionContent>
            </FilterAccordion>
        </FilterAccordionProvider>
    );
};

export const TextFilterAccordionInput = (props: IInputProps) => {
    const { value, setValue } = useFilterAccordionContext();

    return (
        <Input
            variant={value ? "icon-right" : undefined}
            value={(value as string) || ""}
            onChange={(e) => setValue(e.target.value)}
            {...props}
        />
    );
};

export const TextFilterAccordionInputClearIcon = ({ onClick, ...props }: IInputClearIcon) => {
    const { value, clearValue } = useFilterAccordionContext();

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
