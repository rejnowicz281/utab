import { useSearchParams } from "react-router";

export type IFilterObjectValue = string | number | boolean | null;

export type IFilterObject = Record<string, IFilterObjectValue>;

export const useParamFilterObject = (): [IFilterObject, (newFilterObject: IFilterObject | null) => void] => {
    const [searchParams, setSearchParams] = useSearchParams();

    const paramFilter = searchParams.get("filter");

    const filterObject = paramFilter ? JSON.parse(paramFilter) : {};

    const deleteFilterObject = () => {
        setSearchParams((prev) => {
            const newSearchParams = new URLSearchParams(prev);
            newSearchParams.delete("filter");
            return newSearchParams;
        });
    };

    const setFilterObject = (newFilterObject: IFilterObject | null) => {
        if (newFilterObject) {
            if (Object.keys(newFilterObject).length === 0) {
                deleteFilterObject();
            } else
                setSearchParams((prev) => {
                    const newSearchParams = new URLSearchParams(prev);
                    newSearchParams.set("filter", JSON.stringify(newFilterObject));
                    return newSearchParams;
                });
        } else deleteFilterObject();
    };

    return [filterObject, setFilterObject];
};
