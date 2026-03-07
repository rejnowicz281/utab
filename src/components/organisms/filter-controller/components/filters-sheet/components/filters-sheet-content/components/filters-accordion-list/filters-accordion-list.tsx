import { useFilterControllerContext } from "@/components/organisms/filter-controller/providers/filter-controller-provider/filter-controller-provider.hooks";
import { TextFilterAccordion } from "./components/filter-accordion/variants/text-filter-accordion";

export const FiltersAccordionList = () => {
    const { filters } = useFilterControllerContext();

    return (
        <div className="flex flex-col py-1 overflow-y-auto">
            {filters.map((filter) => {
                switch (filter.meta.type) {
                    case "text":
                        return <TextFilterAccordion filter={filter} />;
                    case "number":
                        return <TextFilterAccordion type="number" filter={filter} />;
                    case "date":
                        return <TextFilterAccordion type="date" filter={filter} />;
                    default:
                        return <TextFilterAccordion filter={filter} />;
                }
            })}
        </div>
    );
};
