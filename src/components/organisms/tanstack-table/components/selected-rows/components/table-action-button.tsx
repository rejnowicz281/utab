import { Button, type IButtonProps } from "@/components/ui/button";

type ITableActionButtonProps = IButtonProps;

export const TableActionButton = (props: ITableActionButtonProps) => {
    return <Button variant="outline" {...props} />;
};
