import { useFilterControllerContext } from "@/components/organisms/filter-controller/filter-controller-provider";
import { TextFilterAccordion } from "./components/filter-accordion/variants/text-filter-accordion";

export const FiltersAccordionList = () => {
    const { filters } = useFilterControllerContext();

    return (
        <div className="flex flex-col py-1 overflow-y-auto">
            {filters.map((filter) => {
                switch (filter.meta.type) {
                    case "text":
                        return <TextFilterAccordion key={filter.id} filter={filter} />;
                    case "number":
                        return <TextFilterAccordion key={filter.id} type="number" filter={filter} />;
                    case "date":
                        return <TextFilterAccordion key={filter.id} type="date" filter={filter} />;
                    default:
                        return <TextFilterAccordion key={filter.id} filter={filter} />;
                }
            })}
        </div>
    );
};
