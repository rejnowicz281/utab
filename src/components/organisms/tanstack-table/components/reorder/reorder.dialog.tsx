import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { closestCenter, DndContext, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { ColumnOrderState, VisibilityState } from "@tanstack/react-table";
import { Move } from "lucide-react";
import { useState } from "react";
import { useTanstackTableContext } from "../../providers/tanstack-table-provider/tanstack-table-provider.hooks";
import { TanstackTableReorderButton } from "./reorder.button";

function SortableColumnRow({ id, visible, onToggle }: { id: string; visible: boolean; onToggle: () => void }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={cn("flex items-center justify-start w-full gap-x-4 border-b-px border-b-[#EFEFEF] p-1", {
                "bg-blue-50": visible,
                "bg-gray-50": !visible,
                "shadow-lg": isDragging
            })}
        >
            <Checkbox checked={visible} onCheckedChange={onToggle} />
            <span className="w-full">{id}</span>
            <Move className="text-gray-500 cursor-grab" />
        </div>
    );
}

export const TanstackTableReorderDialog = () => {
    const { columnOrder, setColumnOrder, setColumnVisibility, columnVisibility, options } = useTanstackTableContext();

    const [tempColumns, setTempColumns] = useState<ColumnOrderState>(columnOrder);
    const [tempVisibility, setTempVisibility] = useState<VisibilityState>(columnVisibility);

    const handleVisibilityChange = (columnKey: string) => {
        setTempVisibility((prev) => ({
            ...prev,
            [columnKey]: !prev[columnKey]
        }));
    };

    const [dialogOpen, setDialogOpen] = useState(false);

    const handleApply = () => {
        const filteredColumns = tempColumns.filter((column) => column !== "actions");
        setColumnOrder([...filteredColumns, "actions"]);
        setColumnVisibility(tempVisibility);
        setDialogOpen(false);
    };

    const onOpenChange = (open: boolean) => {
        setDialogOpen(open);
        if (!open) {
            setTempColumns(columnOrder);
            setTempVisibility(columnVisibility);
        }
    };

    const handleDefault = () => {
        const defaultColumnOrder = options.columns.map((col) => String(col.id)).filter((id) => id !== "actions") || [];
        setTempColumns([...defaultColumnOrder, "actions"]);
        const defaultVisibility: VisibilityState = {};
        options.columns?.forEach((col) => {
            if (col.id !== "actions") defaultVisibility[String(col.id)] = true;
        });
        setTempVisibility(defaultVisibility);
    };

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 5 }
        })
    );

    return (
        <Dialog open={dialogOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <TanstackTableReorderButton />
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reorder and Toggle Column Visibility</DialogTitle>
                    <DialogDescription>
                        Drag and drop columns to reorder them. Use the checkboxes to toggle column visibility.
                    </DialogDescription>
                </DialogHeader>

                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={(event) => {
                        const { active, over } = event;
                        if (!over || active.id === over.id) return;

                        setTempColumns((cols) => {
                            const oldIndex = cols.indexOf(active.id as string);
                            const newIndex = cols.indexOf(over.id as string);
                            return arrayMove(cols, oldIndex, newIndex);
                        });
                    }}
                >
                    <SortableContext
                        items={tempColumns.filter((c) => c !== "actions")}
                        strategy={verticalListSortingStrategy}
                    >
                        <div className="flex flex-col gap-1 cursor-move">
                            {tempColumns.map((column) =>
                                column === "actions" ? null : (
                                    <SortableColumnRow
                                        key={column}
                                        id={column}
                                        visible={!!tempVisibility[column]}
                                        onToggle={() => handleVisibilityChange(column)}
                                    />
                                )
                            )}
                        </div>
                    </SortableContext>
                </DndContext>
                <DialogFooter className="sm:justify-between">
                    <Button variant="outline" onClick={handleDefault}>
                        Default
                    </Button>
                    <div className="flex flex-col-reverse sm:flex-row gap-2">
                        <DialogClose asChild>
                            <Button variant="outline">Close</Button>
                        </DialogClose>
                        <Button onClick={handleApply}>Apply</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
