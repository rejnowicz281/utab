import { useReactTable, type ColumnOrderState, type TableOptions } from "@tanstack/react-table";
import { useMemo, useState } from "react";

function useTanstackTable<T>(options: TableOptions<T>) {
    const [columnVisibility, setColumnVisibility] = useState({});
    const [columnOrder, setColumnOrder] = useState<ColumnOrderState>([]);

    const { state: optionsState, ..._options } = options;

    const table = useReactTable({
        ..._options,
        state: {
            columnVisibility,
            columnOrder
        },
        onColumnVisibilityChange: setColumnVisibility,
        onColumnOrderChange: setColumnOrder
    });

    const columnSizeVars = useMemo(() => {
        const headers = table.getFlatHeaders();
        const colSizes: { [key: string]: number } = {};
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i]!;
            colSizes[`--header-${header.id}-size`] = header.getSize();
            colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
        }
        return colSizes;
    }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

    return { columnVisibility, setColumnVisibility, columnOrder, setColumnOrder, table, columnSizeVars };
}

export { useTanstackTable };
