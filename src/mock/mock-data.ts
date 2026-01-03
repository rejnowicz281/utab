export interface IInvoice {
    id: number;
    status: string;
    method: string;
    amount: number;
    date: string;
    description?: string;
    client: string;
    currency: string;
    dueDate: string;
    taxAmount: number;
    discountAmount?: number;
    referenceNumber: string;
}

export const generateMockInvoices = (count = 10): IInvoice[] =>
    Array.from({ length: count }, (_, index) => {
        const amount = parseFloat((Math.random() * 1000).toFixed(2));
        const taxAmount = parseFloat((amount * 0.1).toFixed(2));

        return {
            id: 1000 + index,
            status: ["Paid", "Pending", "Overdue"][Math.floor(Math.random() * 3)],
            method: ["Credit Card", "Cash", "Bank Transfer"][Math.floor(Math.random() * 3)],
            amount,
            date: new Date().toISOString().split("T")[0],
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
            currency: ["USD", "EUR", "GBP"][Math.floor(Math.random() * 3)],
            taxAmount,
            discountAmount: Math.random() > 0.7 ? 10 : undefined,
            referenceNumber: `INV-${1000 + index}`,
            client: ["Acme Corp", "Globex Inc", "Initech", "Umbrella Corp"][Math.floor(Math.random() * 4)]
        };
    });
