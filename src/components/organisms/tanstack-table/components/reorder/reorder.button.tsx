import { Button, type IButtonProps } from "@/components/ui/button";
import { Menu } from "lucide-react";

type IReorderButtonProps = IButtonProps;

export function TanstackTableReorderButton(props: IReorderButtonProps) {
    return (
        <Button variant="ghost" {...props}>
            <Menu />
        </Button>
    );
}
