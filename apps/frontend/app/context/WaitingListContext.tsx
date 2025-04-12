"use client";

import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Puppy, PuppyStatus } from "@repo/types";
import { useToast } from "@repo/ui/hooks/use-toast";
import { format } from "date-fns";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:12345";

interface WaitingListContextType {
  puppyList: Puppy[];
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
  addPuppy: (puppy: Omit<Puppy, "id" | "status" | "arrivalTime">) => void;
  updatePuppyStatus: (id: string, status: PuppyStatus) => void;
  updatePuppyPosition: (fromIndex: number, toIndex: number) => void;
  removePuppy: (id: string) => void;
  getFilteredPuppies: (status?: PuppyStatus) => Puppy[];
  searchPuppies: (searchTerm: string, status?: PuppyStatus) => Puppy[];
  isLoading: boolean;
  listExists: boolean;
}

const WaitingListContext = createContext<WaitingListContextType | undefined>(undefined);

export const WaitingListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  // Fetch waiting list from API
  const { data: waitingList, isLoading } = useQuery({
    queryKey: ["waiting-list", format(selectedDate, "yyyy-MM-dd")],
    queryFn: async () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(`${API_BASE_URL}/waiting-list/by-date?date=${formattedDate}`);
      if (!response.ok) throw new Error("Failed to fetch waiting list");
      return response.json();
    },
  });

  const { data: listExists } = useQuery({
    queryKey: ["waiting-list-exists", format(selectedDate, "yyyy-MM-dd")],
    queryFn: async () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(`${API_BASE_URL}/waiting-list/exists?date=${formattedDate}`);
      if (!response.ok) throw new Error("Failed to check if list exists");
      return response.json();
    },
  });

  const puppyList = waitingList?.puppies || [];

  // Mutation for adding a puppy
  const addPuppyMutation = useMutation({
    mutationFn: async (puppy: Omit<Puppy, "id" | "status" | "arrivalTime">) => {
      const now = new Date();
      const newPuppy = {
        ...puppy,
        status: "waiting" as PuppyStatus,
        arrivalTime: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const response = await fetch(`${API_BASE_URL}/puppies`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPuppy),
      });
      if (!response.ok) throw new Error("Failed to add puppy");
      return response.json();
    },
    onSuccess: (newPuppy) => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      queryClient.invalidateQueries({ queryKey: ["waiting-list", formattedDate] });
      toast({
        title: "Puppy Added",
        description: `${newPuppy.name} has been added to the waiting list.`,
      });
    },
  });

  // Mutation for updating puppy status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: PuppyStatus }) => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(`${API_BASE_URL}/puppies/${id}/status`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, date: formattedDate }),
      });
      if (!response.ok) throw new Error("Failed to update status");
      return response.json();
    },
    onSuccess: (updatedPuppy) => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      queryClient.invalidateQueries({ queryKey: ["waiting-list", formattedDate] });
      toast({
        title: `Status Updated: ${updatedPuppy.status.replace("-", " ")}`,
        description: `${updatedPuppy.name}'s status has been updated.`,
      });
    },
  });

  // Mutation for reordering puppies
  const updatePositionMutation = useMutation({
    mutationFn: async ({ id, position }: { id: string; position: number }) => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(`${API_BASE_URL}/puppies/${id}/position`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ position, date: formattedDate }),
      });
      if (!response.ok) throw new Error("Failed to update position");
      return response.json();
    },
    onSuccess: () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      queryClient.invalidateQueries({ queryKey: ["waiting-list", formattedDate] });
      toast({
        title: "List Reordered",
        description: "The waiting list order has been updated.",
      });
    },
  });

  // Mutation for removing a puppy
  const removePuppyMutation = useMutation({
    mutationFn: async (id: string) => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const response = await fetch(`${API_BASE_URL}/puppies/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ date: formattedDate }),
      });
      if (!response.ok) throw new Error("Failed to remove puppy");
      return response.json();
    },
    onSuccess: (removedPuppy) => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      queryClient.invalidateQueries({ queryKey: ["waiting-list", formattedDate] });
      toast({
        title: "Puppy Removed",
        description: `${removedPuppy.name} has been removed from the waiting list.`,
        variant: "destructive",
      });
    },
  });

  const addPuppy = (puppy: Omit<Puppy, "id" | "status" | "arrivalTime">) => {
    addPuppyMutation.mutate(puppy);
  };

  const updatePuppyStatus = (id: string, status: PuppyStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const updatePuppyPosition = (fromIndex: number, toIndex: number) => {
    const puppy: Puppy | undefined = puppyList[fromIndex];
    if (puppy) {
      updatePositionMutation.mutate({ id: puppy.id, position: toIndex });
    }
  };

  const removePuppy = (id: string) => {
    removePuppyMutation.mutate(id);
  };

  const getFilteredPuppies = (status?: PuppyStatus) => {
    if (!status) return puppyList;
    return puppyList.filter((puppy: Puppy) => puppy.status === status);
  };

  const searchPuppies = (searchTerm: string, status?: PuppyStatus): Puppy[] => {
    if (!searchTerm.trim()) {
      return status ? getFilteredPuppies(status) : puppyList;
    }

    const lowerCaseSearch = searchTerm.toLowerCase().trim();
    const statusFiltered = status ? getFilteredPuppies(status) : puppyList;

    return statusFiltered.filter((puppy: Puppy) => {
      return (
        puppy.name.toLowerCase().includes(lowerCaseSearch) ||
        puppy.breed.toLowerCase().includes(lowerCaseSearch) ||
        puppy.ownerName.toLowerCase().includes(lowerCaseSearch) ||
        puppy.ownerPhone.toLowerCase().includes(lowerCaseSearch) ||
        puppy.service.toLowerCase().includes(lowerCaseSearch) ||
        (puppy.notes && puppy.notes.toLowerCase().includes(lowerCaseSearch))
      );
    });
  };

  return (
    <WaitingListContext.Provider
      value={{
        puppyList,
        selectedDate,
        setSelectedDate,
        addPuppy,
        updatePuppyStatus,
        updatePuppyPosition,
        removePuppy,
        getFilteredPuppies,
        searchPuppies,
        isLoading,
        listExists: listExists === true,
      }}
    >
      {children}
    </WaitingListContext.Provider>
  );
};

export const useWaitingList = () => {
  const context = useContext(WaitingListContext);
  if (context === undefined) {
    throw new Error("useWaitingList must be used within a WaitingListProvider");
  }
  return context;
};
