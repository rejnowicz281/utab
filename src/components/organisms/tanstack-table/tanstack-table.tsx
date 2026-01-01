import { Table, TableBody, TableCell, TableHead, TableHeader, TableNavigation, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender, useReactTable, type Row, type TableOptions } from "@tanstack/react-table";
import { memo, useMemo } from "react";

function TanstackTable<T>({
    options,
    id,
    stickyLeft = true,
    stickyRight = true
}: {
    options: TableOptions<T>;
    id: string;
    stickyLeft?: boolean;
    stickyRight?: boolean;
}) {
    const table = useReactTable(options);

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

    return (
        <Table
            id={id}
            containerProps={{
                style: { ...columnSizeVars },
                className: "border",
                children: <TableNavigation aria-label="Table controls" aria-controls={id} />
            }}
        >
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header, idx) => (
                            <TableHead
                                style={{ width: `calc(var(--header-${header?.id}-size) * 1px)` }}
                                sticky={
                                    stickyLeft && idx === 0
                                        ? "left"
                                        : stickyRight && idx === headerGroup.headers.length - 1
                                        ? "right"
                                        : undefined
                                }
                                key={header.id}
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                {header.column.columnDef.enableResizing !== false ? (
                                    <div
                                        className={cn(
                                            "w-1 absolute h-4.5 rounded-full ml-3 inline-block cursor-e-resize",
                                            header.column.getIsResizing() ? "bg-gray-500" : "bg-black"
                                        )}
                                        onDoubleClick={header.column.resetSize}
                                        onMouseDown={header.getResizeHandler()}
                                        onTouchStart={header.getResizeHandler()}
                                    />
                                ) : null}
                            </TableHead>
                        ))}
                    </TableRow>
                ))}
            </TableHeader>
            <TanstackTableBody rows={table.getRowModel().rows} stickyLeft={stickyLeft} stickyRight={stickyRight} />
        </Table>
    );
}

function TanstackTableBody<T>({
    rows,
    stickyLeft,
    stickyRight
}: {
    rows: Row<T>[];
    stickyLeft?: boolean;
    stickyRight?: boolean;
}) {
    return (
        <TableBody>
            {rows.map((row) => (
                <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell, idx) => (
                        <TableCell
                            key={cell.id}
                            style={{
                                width: `calc(var(--col-${cell.column.id}-size) * 1px)`
                            }}
                            sticky={
                                stickyLeft && idx === 0
                                    ? "left"
                                    : stickyRight && idx === row.getVisibleCells().length - 1
                                    ? "right"
                                    : undefined
                            }
                        >
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );
}
// @ts-expect-error Memo. Not sure if needed. With 100 rows seems fine either way.
const MemoizedTableBody = memo(TanstackTableBody, (prev, next) => {
    return prev.rows === next.rows;
});

export { TanstackTable };
