import { FiltersBadgesList } from "./components/filters-chip-list/filters-chip-list";
import { FiltersSheet } from "./components/filters-sheet/filters-sheet";
import { LocalSearch } from "./components/local-search/local-search";
import { LocalSearchTooltip } from "./components/local-search/local-search-tooltip";
import { FilterControllerProvider, type IFilterControllerProps } from "./filter-controller-provider";

export const FilterController = (props: IFilterControllerProps) => {
    return (
        <FilterControllerProvider {...props}>
            <FilterControllerMain />
        </FilterControllerProvider>
    );
};

const FilterControllerMain = () => {
    // const { filters, localFilterObject, paramFilterObject } = useFilterControllerContext();

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
                <LocalSearch />
                <LocalSearchTooltip />
                <FiltersSheet />
            </div>
            {/* <pre>{JSON.stringify({ filters, localFilterObject, paramFilterObject }, null, 2)}</pre> */}
            <FiltersBadgesList />
        </div>
    );
};
