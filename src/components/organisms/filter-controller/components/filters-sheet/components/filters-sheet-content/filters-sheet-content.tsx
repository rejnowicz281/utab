import { useFilterControllerContext } from "@/components/organisms/filter-controller/providers/filter-controller-provider/filter-controller-provider.hooks";
import { Button } from "@/components/ui/button";
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";
import { FiltersAccordionList } from "./components/filters-accordion-list/filters-accordion-list";

export const FiltersSheetContent = () => {
    const { clearLocalFilters, applyFilters } = useFilterControllerContext();

    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Filter, sort and manage your invoices</SheetDescription>
            </SheetHeader>
            <FiltersAccordionList />

            <SheetFooter>
                {/* <SaveTemplate
                    setCurrentTemplateInfo={setCurrentTemplateInfo}
                    clippings={clippings}
                    clippingFilter={clippingFilter}
                    clippingShow={clippingShow}
                    setTemplates={setTemplates}
                    currentTemplateInfo={currentTemplateInfo}
                    trigger={<Button>Save template</Button>}
                /> */}

                {/* <Button>Save filter group</Button> */}

                {/* {currentTemplateInfo?.id && ( */}
                {/* <Button
                    variant="outline"
                    // onClick={() => {
                    //     setCurrentTemplateInfo(undefined);
                    //     setTemplates((prev) => prev.filter((t) => t.id !== currentTemplateInfo.id));
                    // }}
                >
                    Delete filter group
                </Button> */}
                {/* )} */}
                <Button onClick={applyFilters}>Apply filters</Button>
                <Button variant="outline" onClick={clearLocalFilters}>
                    Clear filters
                </Button>
                <SheetClose asChild>
                    <Button onClick={applyFilters} variant="outline">
                        Close & Apply
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    );
};
