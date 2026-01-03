import { useLocalState } from "@/lib/hooks";
import {
    useReactTable,
    type ColumnOrderState,
    type RowData,
    type TableOptions,
    type VisibilityState
} from "@tanstack/react-table";
import { useMemo } from "react";

export interface ExtendedColumnMeta<_TData, _TValue> {
    hiddenByDefault?: boolean;
    cellAlign?: "left" | "right";
}

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ColumnMeta<TData extends RowData, TValue> extends ExtendedColumnMeta<TData, TValue> {}
}

function useTanstackTable<T>(options: TableOptions<T>, id: string) {
    const [columnVisibility, setColumnVisibility] = useLocalState<VisibilityState>(
        "tanstack-table-column-visibility-" + id,
        options.columns.reduce((acc, col) => {
            acc[String(col.id)] = !col.meta?.hiddenByDefault;
            return acc;
        }, {} as VisibilityState)
    );
    const [columnOrder, setColumnOrder] = useLocalState<ColumnOrderState>(
        "tanstack-table-column-order-" + id,
        options.columns.map((col) => String(col.id))
    );

    const { state: optionsState, ..._options } = options;

    const table = useReactTable({
        ..._options,
        state: {
            columnVisibility,
            columnOrder,
            ...optionsState
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
