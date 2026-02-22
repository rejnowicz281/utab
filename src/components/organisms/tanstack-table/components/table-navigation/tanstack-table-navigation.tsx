import { TableNavigation, type ITableNavigationProps } from "@/components/ui/table";
import { useParamsPageNumber } from "@/lib/utils";
import { useSearchParams } from "react-router";
import { useTanstackTableContext } from "../../providers/tanstack-table-provider/tanstack-table-provider.hooks";

export const TanstackTableNavigation = (props: ITableNavigationProps) => {
    const { id, totalCount, pageSize } = useTanstackTableContext();
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = useParamsPageNumber();

    const totalPages = totalCount && pageSize ? Math.ceil(totalCount / pageSize) : 1;

    return (
        <TableNavigation
            totalItems={totalCount}
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={(newPage) => {
                setSearchParams({ ...Object.fromEntries(searchParams), pageNumber: String(newPage) });
            }}
            aria-label="Table controls"
            aria-controls={id}
            {...props}
        />
    );
};
