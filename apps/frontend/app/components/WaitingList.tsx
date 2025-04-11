import React, { useState } from "react";
import { useWaitingList } from "../context/WaitingListContext";
import PuppyCard from "./PuppyCard";
import { Button } from "@repo/ui/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@repo/ui/components/ui/tabs";
import { PuppyStatus } from "@repo/types";
import { Search, X } from "lucide-react";
import { Input } from "@repo/ui/components/ui/input";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { SortablePuppyCard } from "./SortablePuppyCard";

export default function WaitingList() {
  const { puppyList, updatePuppyPosition, getFilteredPuppies, searchPuppies } = useWaitingList();
  const [reorderMode, setReorderMode] = useState(false);
  const [activeTab, setActiveTab] = useState<PuppyStatus | "all">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const waitingPuppies = getFilteredPuppies("waiting");
      const oldIndex = waitingPuppies.findIndex(p => p.id === active.id);
      const newIndex = waitingPuppies.findIndex(p => p.id === over.id);
      
      // Get all puppies and find the actual indices in the full list
      const fullListOldIndex = puppyList.findIndex(p => p.id === active.id);
      const fullListNewIndex = puppyList.findIndex(p => p.id === over.id);
      
      updatePuppyPosition(fullListOldIndex, fullListNewIndex);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const getListToDisplay = () => {
    if (searchTerm.trim()) {
      return searchPuppies(searchTerm, activeTab !== "all" ? activeTab as PuppyStatus : undefined);
    }
    
    if (activeTab === "all") {
      return puppyList;
    }
    
    return getFilteredPuppies(activeTab as PuppyStatus);
  };

  const displayList = getListToDisplay();
  const waitingPuppies = getFilteredPuppies("waiting");

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-puppy-purple-dark">
          Puppy Waiting List
        </h2>
        {activeTab === "waiting" && puppyList.some(p => p.status === "waiting") && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setReorderMode(!reorderMode)}
            className="flex items-center gap-1"
          >
            {reorderMode ? "Done Reordering" : "Reorder List"}
          </Button>
        )}
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search puppies by any detail..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-10 pr-10"
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-2 h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Tabs defaultValue="all" onValueChange={(value) => setActiveTab(value as PuppyStatus | "all")}>
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="waiting">Waiting</TabsTrigger>
          <TabsTrigger value="in_progress">In Service</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          {displayList.length === 0 ? (
            <div className="text-center py-10 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                {searchTerm ? "No puppies match your search" : "No puppies in this category"}
              </p>
            </div>
          ) : reorderMode && activeTab === "waiting" ? (
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={waitingPuppies.map(p => p.id)}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-4">
                  {waitingPuppies.map((puppy, index) => (
                    <SortablePuppyCard
                      key={puppy.id}
                      puppy={puppy}
                      index={index}
                    />
                  ))}
                </div>
              </SortableContext>
            </DndContext>
          ) : (
            <div className="space-y-4">
              {displayList.map((puppy) => (
                <PuppyCard key={puppy.id} puppy={puppy} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
