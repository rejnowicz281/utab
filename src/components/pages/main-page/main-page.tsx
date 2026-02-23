import { TanstackTableReorderDialog } from "@/components/organisms/tanstack-table/components/reorder/reorder.dialog";
import { TableActionMockButton } from "@/components/organisms/tanstack-table/components/selected-rows/components/table-action-button";
import { TanstackTable } from "@/components/organisms/tanstack-table/tanstack-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useParamsPageNumber, useParamsPageSize } from "@/lib/utils";
import { generateMockInvoices, type IInvoice } from "@/mock/mock-data";
import { createColumnHelper, getCoreRowModel } from "@tanstack/react-table";
import { ActivitySquare, Check, ChevronRight, Smile, Trash2, X } from "lucide-react";
import { useMemo, useState } from "react";

export default function MainPage() {
    const { accessor, display } = createColumnHelper<IInvoice>();

    const columns = useMemo(
        () => [
            accessor("id", {
                cell: ({ getValue }) => `#${getValue()}`,
                header: "Invoice",
                id: "Invoice"
            }),

            accessor("client", {
                cell: ({ getValue }) => getValue(),
                header: "Client",
                id: "Client"
            }),

            accessor("status", {
                cell: ({ getValue }) => <Badge variant="secondary">{getValue()}</Badge>,
                header: "Status",
                id: "Status"
            }),

            accessor("method", {
                cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>,
                header: "Method",
                id: "Method"
            }),

            accessor("date", {
                cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
                header: "Date",
                id: "Date"
            }),

            accessor("dueDate", {
                cell: ({ getValue }) => new Date(getValue()).toLocaleDateString(),
                header: "Due",
                id: "Due"
            }),

            accessor("amount", {
                cell: ({ row }) => {
                    const { amount, currency } = row.original;
                    return `${currency} ${amount.toFixed(2)}`;
                },
                header: "Amount",
                id: "Amount",
                meta: {
                    cellAlign: "right"
                }
            }),

            accessor("taxAmount", {
                cell: ({ getValue }) => getValue().toFixed(2),
                header: "Tax",
                id: "Tax",
                meta: {
                    cellAlign: "right"
                }
            }),

            accessor("referenceNumber", {
                cell: ({ getValue }) => getValue(),
                header: "Ref",
                id: "Ref"
            }),

            display({
                id: "actions",
                enableResizing: false,
                header: () => (
                    <div className="text-right">
                        <TanstackTableReorderDialog />
                    </div>
                ),
                cell: () => (
                    <div className="text-right">
                        <Button variant="outline" size="icon">
                            <ChevronRight />
                        </Button>
                    </div>
                )
            })
        ],
        []
    );

    const [mockTotalCount, setMockTotalCount] = useState<number>(1000);

    const mockData = useMemo(() => generateMockInvoices(mockTotalCount), [mockTotalCount]);

    const currentPage = useParamsPageNumber();
    const pageSize = useParamsPageSize();

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = mockData.slice(startIndex, endIndex);

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="flex items-center gap-2">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="mock-total-count">Mock total Count:</Label>
                    <Input
                        id="mock-total-count"
                        placeholder="Mock total count (default: 1000)"
                        type="number"
                        value={mockTotalCount}
                        onChange={(e) => setMockTotalCount(e.target.value ? Number(e.target.value) : 0)}
                    />
                </div>
            </div>
            <div className="flex gap-12">
                <TanstackTable
                    totalCount={mockTotalCount}
                    selectedRowsActions={
                        <>
                            <TableActionMockButton>
                                <ActivitySquare />
                                Activate
                            </TableActionMockButton>
                            <TableActionMockButton>
                                <Check />
                                Accept
                            </TableActionMockButton>
                            <TableActionMockButton>
                                <X />
                                Reject
                            </TableActionMockButton>
                            <TableActionMockButton variant="destructive">
                                <Trash2 />
                                Delete
                            </TableActionMockButton>
                        </>
                    }
                    options={{
                        data: paginatedData,
                        columns,
                        getCoreRowModel: getCoreRowModel(),
                        columnResizeMode: "onChange",
                        defaultColumn: { minSize: 150, maxSize: 800 }
                    }}
                    id="invoices-table"
                />

                <div className="border bg-teal-300 rounded-lg flex items-center justify-center p-4 h-24 w-24">
                    <Smile className="text-teal-600" size={48} />
                </div>
            </div>
        </div>
    );
}
