"use client";

import * as React from "react";
import { format } from "date-fns";
import { Scissors, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@repo/ui/components/ui/button";
import { useToast } from "@repo/ui/hooks/use-toast";
import { useWaitingList } from "../context/WaitingListContext";
import { Calendar } from "@repo/ui/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/ui/components/ui/popover";
import { cn } from "@repo/ui/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:12345";

export default function Header() {
  const { toast } = useToast();
  const { selectedDate, setSelectedDate, isLoading, listExists } = useWaitingList();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Read date from URL on initial load
  React.useEffect(() => {
    const dateParam = searchParams.get('date');
    if (dateParam) {
      const date = new Date(dateParam);
      if (!isNaN(date.getTime())) {
        setSelectedDate(date);
      }
    }
  }, [searchParams, setSelectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Update URL with new date
      const params = new URLSearchParams(searchParams.toString());
      params.set('date', format(date, 'yyyy-MM-dd'));
      router.push(`?${params.toString()}`);
    }
  };

  const createNewList = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/waiting-list/new`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: format(selectedDate, "yyyy-MM-dd"),
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to create new list');
      }

      toast({
        title: "New List Created",
        description: `A new waiting list has been created for ${format(selectedDate, "MMMM d, yyyy")}.`,
      });

      // Refresh the page to show the new list
      window.location.reload();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create new waiting list",
        variant: "destructive",
      });
      console.error(error);
    }
  };

  return (
    <header className="bg-puppy-purple-dark text-white p-4 rounded-xl shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <Scissors className="h-8 w-8" />
        <div>
          <h1 className="text-2xl font-bold">Puppy Spa</h1>
          <p className="text-sm text-white/90">Waiting List Manager</p>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <Button
          variant="secondary"
          onClick={createNewList}
          className="bg-white text-puppy-purple-dark font-medium hover:bg-gray-100"
          disabled={listExists || isLoading}
        >
          New List
        </Button>
        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-[240px] justify-start text-puppy-purple-dark text-left font-normal bg-white border-white",
                  !selectedDate && "text-puppy-purple-dark/70"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-white" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                disabled={(date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  return date > today;
                }}
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </header>
  );
} 
