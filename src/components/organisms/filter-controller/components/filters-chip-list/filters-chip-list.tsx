import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useFilterControllerContext } from "../../providers/filter-controller-provider/filter-controller-provider.hooks";
import { TextFilterChip } from "./components/filter-chip/variants/text-filter-chip";

export const FiltersBadgesList = () => {
    const { filters, clearFilters, paramFilterObject } = useFilterControllerContext();

    return (
        <div className="flex items-center gap-2">
            <span>Filters</span>
            <Button
                variant="outline"
                onClick={clearFilters}
                size="icon"
                disabled={Object.keys(paramFilterObject).length === 0}
            >
                <Trash />
            </Button>

            {filters.map((filter) => {
                if (!paramFilterObject[filter.id] && !filter.meta.chipAlwaysVisible) return null;

                switch (filter.meta.type) {
                    case "text":
                        return <TextFilterChip key={filter.id} filter={filter} />;
                    case "number":
                        return <TextFilterChip type="number" key={filter.id} filter={filter} />;
                    default:
                        return <TextFilterChip key={filter.id} filter={filter} />;
                }
            })}
        </div>
    );
};
