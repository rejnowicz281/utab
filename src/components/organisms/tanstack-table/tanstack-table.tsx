import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { flexRender } from "@tanstack/react-table";
import { NullableResizer } from "./components/resizer/resizer";
import { SelectAllRowsCheckbox } from "./components/selected-rows/components/select-all-rows-checkbox";
import { SelectRowCheckbox } from "./components/selected-rows/components/select-row-checkbot";
import { SelectedRows } from "./components/selected-rows/selected-rows";
import { TanstackTableNavigation } from "./components/table-navigation/tanstack-table-navigation";
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
    const { table, columnSizeVars, id, stickyLeft, stickyRight, selectedRowsActions } = useTanstackTableContext();

    return (
        <Table
            id={id}
            innerContainer={{
                style: { ...columnSizeVars },
                className: "border",
                children: <TanstackTableNavigation />
            }}
            outerContainer={{
                children: selectedRowsActions ? <SelectedRows /> : null
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
                                {idx === 0 && !!selectedRowsActions ? (
                                    <SelectAllRowsCheckbox className="mr-3 relative top-0.5" />
                                ) : null}
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
                                {idx === 0 && !!selectedRowsActions ? (
                                    <SelectRowCheckbox row={row} className="mr-3" />
                                ) : null}
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
