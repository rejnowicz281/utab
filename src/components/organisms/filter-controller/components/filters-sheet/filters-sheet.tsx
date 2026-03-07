import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { Save } from "lucide-react";
import { useFilterControllerContext } from "../../filter-controller-provider";
import { FiltersSheetContent } from "./components/filters-sheet-content/filters-sheet-content";

export const FiltersSheet = () => {
    const { syncLocalFiltersWithParamFilters } = useFilterControllerContext();

    return (
        <Sheet
            onOpenChange={(open) => {
                if (open) syncLocalFiltersWithParamFilters();
            }}
        >
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <Save className="text-muted-foreground" size={18} />
                </Button>
            </SheetTrigger>
            <FiltersSheetContent />
        </Sheet>
    );
};
