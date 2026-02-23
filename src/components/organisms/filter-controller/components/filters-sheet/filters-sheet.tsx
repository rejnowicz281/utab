import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Save } from "lucide-react";
import { FiltersSheetContent } from "./filters-sheet-content";

export const FiltersSheet = () => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Save className="text-muted-foreground" size={18} />
                </Button>
            </SheetTrigger>
            <FiltersSheetContent />
        </Sheet>
    );
};
