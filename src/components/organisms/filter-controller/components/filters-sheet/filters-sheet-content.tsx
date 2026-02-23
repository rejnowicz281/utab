import { Button } from "@/components/ui/button";
import {
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle
} from "@/components/ui/sheet";

export const FiltersSheetContent = () => {
    return (
        <SheetContent>
            <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>Filter, sort and manage your invoices</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 px-4 overflow-y-auto"></div>

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

                <Button>Save filter group</Button>

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
                <Button
                    variant="outline"
                    // onClick={() => {
                    //     setClippingFilter(undefined);
                    // }}
                >
                    Reset filters
                </Button>
                <SheetClose asChild>
                    <Button variant="outline">Close & Apply</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    );
};
