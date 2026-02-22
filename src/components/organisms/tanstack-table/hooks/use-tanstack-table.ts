import { useLocalState } from "@/lib/hooks";
import {
    useReactTable,
    type ColumnOrderState,
    type RowData,
    type TableOptions,
    type VisibilityState
} from "@tanstack/react-table";
import { useCallback, useMemo, useState } from "react";

export interface ExtendedColumnMeta<_TData, _TValue> {
    hiddenByDefault?: boolean;
    cellAlign?: "left" | "right";
}

declare module "@tanstack/react-table" {
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    interface ColumnMeta<TData extends RowData, TValue> extends ExtendedColumnMeta<TData, TValue> {}
}

function useTanstackTable<T>(options: TableOptions<T>, id: string, tableVersion: number) {
    const [columnOrder, setColumnOrder] = useColumnOrderState(id, tableVersion, options);
    const [columnVisibility, setColumnVisibility] = useColumnVisibilityState(id, tableVersion, options);

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

    const selectedRowsLogic = useSelectedRows<T>();

    return {
        ...selectedRowsLogic,
        columnVisibility,
        setColumnVisibility,
        columnOrder,
        setColumnOrder,
        table,
        columnSizeVars
    };
}

export { useTanstackTable };

function useSelectedRows<T>() {
    const getRowId = (row: T) => (row as any)?.id;

    const [selectedRows, setSelectedRows] = useState<T[]>([]);

    const isRowSelected = useCallback(
        (rowId: number | string) => {
            return selectedRows.some((row) => getRowId(row) === rowId);
        },
        [selectedRows]
    );

    const toggleRowSelection = useCallback((row: T, rowId: number | string) => {
        setSelectedRows((prev) => {
            const isCurrentlySelected = prev.some((selectedRow) => getRowId(selectedRow) === rowId);

            if (isCurrentlySelected) {
                return prev.filter((selectedRow) => getRowId(selectedRow) !== rowId);
            } else {
                return [...prev, row];
            }
        });
    }, []);

    const toggleAllRowsSelection = useCallback((allRows: T[]) => {
        setSelectedRows((prev) => {
            const allRowIds = allRows.map(getRowId);
            const selectedRowIds = prev.map(getRowId);

            // If all rows are selected, deselect all
            const areAllSelected = allRowIds.every((id) => selectedRowIds.includes(id));

            if (areAllSelected) {
                return prev.filter((selectedRow) => !allRowIds.includes(getRowId(selectedRow)));
            } else {
                // Select all rows that aren't already selected
                const newSelections = allRows.filter((row) => !selectedRowIds.includes(getRowId(row)));
                return [...prev, ...newSelections];
            }
        });
    }, []);

    const resetSelection = useCallback(() => {
        setSelectedRows([]);
    }, []);

    return {
        selectedRows,
        isRowSelected,
        toggleRowSelection,
        toggleAllRowsSelection,
        resetSelection
    };
}

function useColumnVisibilityState<T>(id: string, tableVersion: number, options: TableOptions<T>) {
    const defaultColumnVisibility: VisibilityState = useMemo(() => {
        return options.columns.reduce((acc, col) => {
            acc[String(col.id)] = !col.meta?.hiddenByDefault;
            return acc;
        }, {} as VisibilityState);
    }, [options.columns]);

    return useLocalState<VisibilityState>(
        "tanstack-table-column-visibility-" + id + "-" + tableVersion,
        defaultColumnVisibility,
        () => {
            if (localStorage.getItem("tanstack-table-column-visibility-" + id + "-" + (tableVersion - 1)))
                localStorage.removeItem("tanstack-table-column-visibility-" + id + "-" + (tableVersion - 1));
        }
    );
}

function useColumnOrderState<T>(id: string, tableVersion: number, options: TableOptions<T>) {
    const defaultColumnOrder: ColumnOrderState = useMemo(() => {
        return options.columns.map((col) => String(col.id));
    }, [options.columns]);

    return useLocalState<ColumnOrderState>(
        "tanstack-table-column-order-" + id + "-" + tableVersion,
        defaultColumnOrder,
        () => {
            if (localStorage.getItem("tanstack-table-column-order-" + id + "-" + (tableVersion - 1)))
                localStorage.removeItem("tanstack-table-column-order-" + id + "-" + (tableVersion - 1));
        }
    );
}
