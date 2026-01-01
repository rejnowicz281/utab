export interface IInvoice {
    id: number;
    status: string;
    method: string;
    amount: number;
}

export const MOCK_INVOICES: IInvoice[] = [
    {
        id: 123,
        status: "Paid lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        method: "Credit Card",
        amount: 250
    },
    {
        id: 124,
        status: "Dolor sit amet, consectetur adipisicing elit.",
        method: "Cash",
        amount: 210
    },
    {
        id: 125,
        status: "Pending payment for services rendered.",
        method: "Bank Transfer",
        amount: 300
    },
    {
        id: 126,
        status: "Overdue invoice, please settle immediately.",
        method: "Credit Card",
        amount: 150
    }
];

export const generateMockInvoices = (count = 10): IInvoice[] =>
    Array.from({ length: count }, (_, index) => ({
        id: 1000 + index,
        status: ["Paid", "Pending", "Overdue"][Math.floor(Math.random() * 3)],
        method: ["Credit Card", "Cash", "Bank Transfer"][Math.floor(Math.random() * 3)],
        amount: parseFloat((Math.random() * 1000).toFixed(2))
    }));
