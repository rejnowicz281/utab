import { Button, type IButtonProps } from "@/components/ui/button";
import { useTanstackTableContext } from "../../../providers/tanstack-table-provider/tanstack-table-provider.hooks";

type ITableActionButtonProps = IButtonProps;

export const TableActionButton = (props: ITableActionButtonProps) => {
    return <Button variant="outline" {...props} />;
};

// MOCK TABLE ACTION: For demonstration purposes
export const TableActionMockButton = ({ onClick, ...props }: ITableActionButtonProps) => {
    const { selectedRows } = useTanstackTableContext();

    return (
        <TableActionButton
            onClick={(e) => {
                onClick?.(e);

                console.log("Selected rows:", selectedRows);

                alert(`Selected rows (check console):\n${JSON.stringify(selectedRows, null, 2)}`);
            }}
            {...props}
        />
    );
};
