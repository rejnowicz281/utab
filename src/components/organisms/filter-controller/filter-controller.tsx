import { FiltersBadgesList } from "./components/filters-badges-list/filters-badges-list";
import { FiltersSheet } from "./components/filters-sheet/filters-sheet";
import { LocalSearch } from "./components/local-search/local-search";
import { LocalSearchTooltip } from "./components/local-search/local-search-tooltip";
import {
    FilterControllerProvider,
    type IFilterControllerProps
} from "./providers/filter-controller-provider/filter-controller-provider";

export const FilterController = (props: IFilterControllerProps) => {
    return (
        <FilterControllerProvider {...props}>
            <FilterControllerMain />
        </FilterControllerProvider>
    );
};

const FilterControllerMain = () => {
    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <LocalSearch />
                <LocalSearchTooltip />
                <FiltersSheet />
            </div>
            <FiltersBadgesList />
        </div>
    );
};
