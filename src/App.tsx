import { Table, TableBody, TableCell, TableHead, TableHeader, TableNavigation, TableRow } from "@/components/ui/table";
import { Badge } from "./components/ui/badge";

function App() {
    return (
        <div className="flex gap-12 p-4">
            <Table
                id="invoices-table"
                containerProps={{
                    className: "border",
                    children: <TableNavigation aria-label="Table controls" aria-controls="invoices-table" />
                }}
            >
                <TableHeader>
                    <TableRow>
                        <TableHead sticky="left">Invoice</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead sticky="right">Amount</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell sticky="left">#123</TableCell>
                        <TableCell>Paid leorme Lorem ipsum dolor sit amet, consectetur adipisicing elit.</TableCell>
                        <TableCell>
                            <Badge variant="outline">Credit Card</Badge>
                        </TableCell>
                        <TableCell sticky="right">$250.00</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell sticky="left">#124</TableCell>
                        <TableCell>Dolor sit amet, consectetur adipisicing elit.</TableCell>
                        <TableCell>
                            <Badge variant="outline">Cash</Badge>
                        </TableCell>
                        <TableCell sticky="right">$210.00</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            <div className="border bg-teal-300 rounded-lg p-4 h-24 w-24"></div>
        </div>
    );
}

export default App;
