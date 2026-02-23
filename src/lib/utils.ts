import { clsx, type ClassValue } from "clsx";
import { useSearchParams } from "react-router";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function useParamsPageNumber() {
    const paramsPageNumber = useSearchParams()[0].get("pageNumber");

    return paramsPageNumber ? Number(paramsPageNumber) : 1;
}

export function useParamsPageSize() {
    const paramsPageSize = useSearchParams()[0].get("pageSize");

    return paramsPageSize ? Number(paramsPageSize) : 10;
}

export const useParamsLocalSearch = () => {
    const paramsLocalSearch = useSearchParams()[0].get("localSearch");

    return paramsLocalSearch ? String(paramsLocalSearch) : "";
};
