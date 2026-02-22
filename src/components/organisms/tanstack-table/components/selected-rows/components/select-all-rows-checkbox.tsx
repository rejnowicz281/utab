import { Checkbox, type ICheckboxProps } from "@/components/ui/checkbox";

import { useTanstackTableContext } from "../../../providers/tanstack-table-provider/tanstack-table-provider.hooks";

export const SelectAllRowsCheckbox = ({ onCheckedChange, ...props }: ICheckboxProps) => {
    const { toggleAllRowsSelection, table, selectedRows } = useTanstackTableContext();

    return (
        <Checkbox
            checked={(() => {
                const currentRows = table.getRowModel().rows.map((row) => row.original);
                const currentRowIds = currentRows.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (row) => (row as any)?.id
                );
                const selectedRowIds = selectedRows.map(
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (row) => (row as any)?.id
                );
                return currentRowIds.every((id) => selectedRowIds.includes(id)) && currentRowIds.length > 0;
            })()}
            onCheckedChange={(e) => {
                onCheckedChange?.(e);

                if (!toggleAllRowsSelection) return;

                const currentRows = table.getRowModel().rows.map((row) => row.original);

                toggleAllRowsSelection(currentRows);
            }}
            {...props}
        />
    );
};
