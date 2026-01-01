import { Table, TableBody, TableCell, TableHead, TableHeader, TableNavigation, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { flexRender, type TableOptions } from "@tanstack/react-table";
import { useTanstackTable } from "./hooks/use-tanstack-table";

export interface ITanstackTableProps<T> {
    options: TableOptions<T>;
    id: string;
    stickyLeft?: boolean;
    stickyRight?: boolean;
}

function TanstackTable<T>({ options, id, stickyLeft = true, stickyRight = true }: ITanstackTableProps<T>) {
    // @ts-expect-error TODO TODO TODO TODO TODO TODO TODO
    const { columnVisibility, setColumnVisibility, columnOrder, setColumnOrder, table, columnSizeVars } =
        useTanstackTable(options);

    return (
        <Table
            id={id}
            containerProps={{
                style: { ...columnSizeVars },
                className: "border",
                children: (
                    <TableNavigation
                        totalItems={options.data.length}
                        totalPages={5}
                        currentPage={1}
                        onPageChange={() => {
                            // TODO: pages
                        }}
                        aria-label="Table controls"
                        aria-controls={id}
                    />
                )
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
            <TableBody>
                {table.getRowModel().rows.map((row) => (
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
        </Table>
    );
}

export { TanstackTable };
