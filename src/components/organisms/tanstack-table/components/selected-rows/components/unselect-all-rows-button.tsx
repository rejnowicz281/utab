import { Button, type IButtonProps } from "@/components/ui/button";
import { X } from "lucide-react";
import { useTanstackTableContext } from "../../../providers/tanstack-table-provider/tanstack-table-provider.hooks";

export type IUnselectAllRowsButtonProps = IButtonProps;

export const UnselectAllRowsButton = ({ onClick, ...props }: IUnselectAllRowsButtonProps) => {
    const { resetSelection } = useTanstackTableContext();

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={(e) => {
                onClick?.(e);

                resetSelection();
            }}
            {...props}
        >
            <X />
        </Button>
    );
};
