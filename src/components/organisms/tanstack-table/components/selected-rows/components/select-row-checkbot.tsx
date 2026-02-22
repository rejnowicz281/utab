import { type Row } from "@tanstack/react-table";

import { Checkbox, type ICheckboxProps } from "@/components/ui/checkbox";

import { useTanstackTableContext } from "../../../providers/tanstack-table-provider/tanstack-table-provider.hooks";

export const SelectRowCheckbox = ({ row, onCheckedChange, ...props }: { row: Row<any> } & ICheckboxProps) => {
    const { isRowSelected, toggleRowSelection } = useTanstackTableContext();
    const rowId = row.original.id;

    return (
        <Checkbox
            checked={isRowSelected ? isRowSelected(rowId) : false}
            id={`select-row-${row.id}`}
            onCheckedChange={(e) => {
                onCheckedChange?.(e);

                toggleRowSelection(row.original, rowId);
            }}
            {...props}
        />
    );
};
