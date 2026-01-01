import { createColumnHelper, getCoreRowModel } from "@tanstack/react-table";
import { ChevronRight, Menu, Smile } from "lucide-react";
import { useMemo } from "react";
import { TanstackTable } from "./components/organisms/tanstack-table/tanstack-table";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";
import { generateMockInvoices, type IInvoice } from "./mock/mock-data";

function App() {
    const { accessor, display } = createColumnHelper<IInvoice>();

    const columns = useMemo(
        () => [
            accessor("id", {
                cell: ({ getValue }) => `#${getValue()}`,
                header: "Invoice",
                id: "id"
            }),
            accessor("status", {
                cell: ({ getValue }) => getValue(),
                header: "Status",
                id: "status"
            }),
            accessor("method", {
                cell: ({ getValue }) => <Badge variant="outline">{getValue()}</Badge>,
                header: "Method",
                id: "method"
            }),
            accessor("amount", {
                cell: ({ getValue }) => `$${getValue().toFixed(2)}`,
                header: "Amount",
                id: "amount"
            }),
            display({
                id: "actions",
                enableResizing: false,
                header: () => (
                    <div className="text-right">
                        <Button variant="ghost">
                            <Menu />
                        </Button>
                    </div>
                ),
                cell: () => (
                    <div className="text-right">
                        <Button variant="outline">
                            <ChevronRight />
                        </Button>
                    </div>
                )
            })
        ],
        []
    );

    return (
        <div className="flex gap-12 p-4">
            <TanstackTable
                options={{
                    data: generateMockInvoices(100),
                    columns,
                    getCoreRowModel: getCoreRowModel(),
                    columnResizeMode: "onChange",
                    defaultColumn: {
                        minSize: 150,
                        maxSize: 800
                    }
                }}
                id="invoices-table"
            />

            <div className="border bg-teal-300 rounded-lg flex items-center justify-center p-4 h-24 w-24">
                <Smile className="text-teal-600" size={48} />
            </div>
        </div>
    );
}

export default App;
