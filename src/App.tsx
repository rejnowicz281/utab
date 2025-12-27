import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table/table";

function App() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-25 sticky top-0 left-0 bg-white border-r">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right sticky top-0 right-0 bg-white border-l">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium sticky top-0 left-0 bg-white border-r">
                        Lorem ipsum dolor sit ameaerat tenetur nihil eveniet natus aut saepe suscipit modi assumenda
                        magni commodi iste.
                    </TableCell>
                    <TableCell>Paid leorme Lorem ipsum dolor sit amet, consectetur adipisicing elit.</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right sticky top-0 right-0 bg-white border-l">$250.00</TableCell>
                </TableRow>
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell />
                    <TableCell />
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    );
}

export default App;
