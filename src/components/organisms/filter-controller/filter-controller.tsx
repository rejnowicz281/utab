import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Info } from "lucide-react";
import { LocalSearch } from "./components/local-search/local-search";

export const FilterController = () => {
    return (
        <div className="flex items-center gap-2">
            <LocalSearch />
            <Tooltip>
                <TooltipTrigger>
                    <Info className="text-muted-foreground" size={18} />
                </TooltipTrigger>
                <TooltipContent className="flex flex-col items-center text-center gap-1">
                    <span>Filters table data by searching for partial text matches in:</span>
                    <span>Invoice, Client</span>
                    <span className="text-muted-foreground">Press Ctrl + / to focus</span>
                </TooltipContent>
            </Tooltip>
        </div>
    );
};
