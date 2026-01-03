import { Table, TableBody, TableCell, TableHead, TableHeader, TableNavigation, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { NullableResizer } from "./components/resizer/resizer";
import {
    TanstackTableProvider,
    type ITanstackTableProps
} from "./providers/tanstack-table-provider/tanstack-table-provider";
import { useTanstackTableContext } from "./providers/tanstack-table-provider/tanstack-table-provider.hooks";

function TanstackTable<T>(props: ITanstackTableProps<T>) {
    return (
        <TanstackTableProvider {...props}>
            <TanstackTableMain />
        </TanstackTableProvider>
    );
}

function TanstackTableMain() {
    const { table, columnSizeVars, id, options, stickyLeft, stickyRight } = useTanstackTableContext();

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
                                className={
                                    header.column.columnDef.meta?.cellAlign === "right" ? "text-right" : undefined
                                }
                            >
                                {flexRender(header.column.columnDef.header, header.getContext())}
                                <NullableResizer header={header} />
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
                                className={cell.column.columnDef.meta?.cellAlign === "right" ? "text-right" : undefined}
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
