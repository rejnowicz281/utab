import { useFilterControllerContext } from "@/components/organisms/filter-controller/filter-controller-provider";
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
    const { clearFilters, applyFilters, localFilterObject, paramFilterObject } = useFilterControllerContext();

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
                <SheetClose asChild>
                    <Button
                        disabled={JSON.stringify(localFilterObject) === JSON.stringify(paramFilterObject)}
                        onClick={applyFilters}
                    >
                        Apply filters
                    </Button>
                </SheetClose>
                <Button variant="outline">Save filter group</Button>
                <SheetClose asChild>
                    <Button onClick={clearFilters} variant="outline">
                        Clear applied
                    </Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    );
};
