import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

export const FiltersBadgesList = () => {
    return (
        <div className="flex items-center gap-2">
            <span>Filters</span>
            <Button variant="outline" size="icon" disabled={true}>
                <Trash />
            </Button>
        </div>
    );
};
