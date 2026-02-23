import { Input, InputDiv, InputLeftIcon } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks";
import { useParamsLocalSearch } from "@/lib/utils";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
export const LocalSearch = () => {
    const localSearchParam = useParamsLocalSearch();
    const setSearchParams = useSearchParams()[1];

    const [inputValue, setInputValue] = useState(localSearchParam);

    const debouncedValue = useDebounce(inputValue, 300);

    useEffect(() => {
        if (!debouncedValue) {
            setSearchParams((prev) => Object.fromEntries([...prev.entries()].filter(([key]) => key !== "localSearch")));
            return;
        }

        setSearchParams((prev) => Object.fromEntries([...prev.entries(), ["localSearch", debouncedValue]]));
    }, [debouncedValue, setSearchParams]);

    return (
        <InputDiv>
            <InputLeftIcon component={Search} />
            <Input
                variant="icon-left"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
            />
        </InputDiv>
    );
};
