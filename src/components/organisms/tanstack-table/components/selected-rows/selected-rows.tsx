import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";
import { useTanstackTableContext } from "../../providers/tanstack-table-provider/tanstack-table-provider.hooks";
import { UnselectAllRowsButton } from "./components/unselect-all-rows-button";

export const SelectedRows = ({ children, className, ...props }: ComponentProps<"div">) => {
    const { selectedRows, selectedRowsActions } = useTanstackTableContext();

    return (
        <div
            aria-hidden={!selectedRows.length}
            className={cn(
                `overflow-hidden transition-all duration-50 absolute left-0 right-0 top-[-65px] flex flex-col`,
                selectedRows.length ? "visible" : "invisible pointer-events-none",
                className
            )}
            {...props}
        >
            <div
                className={cn(
                    `flex-1 flex gap-2 bg-secondary flex-row justify-between flex-wrap px-[16px] h-[60px] z-40 border-1 border-gray-200 transition-all duration-50 py-[14px] ${
                        selectedRows.length ? "translate-y-0 opacity-100" : "translate-y-full opacity-0 rounded-t-lg"
                    }`
                )}
                tabIndex={selectedRows.length ? 0 : -1}
            >
                <div className="flex items-center gap-2">
                    <UnselectAllRowsButton />
                    {selectedRows.length ? `${selectedRows.length} selected` : null}
                </div>
                <div className="flex items-center flex-wrap gap-2">
                    {selectedRowsActions}
                    {children}
                </div>
            </div>
        </div>
    );
};
