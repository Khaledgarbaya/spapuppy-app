"use client";

import React, { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Puppy, PuppyStatus } from "@repo/types";
import { useToast } from "@repo/ui/hooks/use-toast";

// Store/load puppies from localStorage
const getPuppiesFromStorage = (): Puppy[] => {
  const savedList = localStorage.getItem("puppyWaitingList");
  const savedOrder = localStorage.getItem("puppyWaitingOrder");
  const puppies = savedList ? JSON.parse(savedList) : [];
  
  // If we have a saved order, sort the waiting puppies according to it
  if (savedOrder) {
    const orderMap = new Map<string, number>(JSON.parse(savedOrder));
    return puppies.sort((a: Puppy, b: Puppy) => {
      if (a.status !== "waiting" || b.status !== "waiting") return 0;
      return (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0);
    });
  }
  
  return puppies;
};

const savePuppiesToStorage = (puppies: Puppy[]) => {
  // Save the puppies list
  localStorage.setItem("puppyWaitingList", JSON.stringify(puppies));
  
  // Save the order of waiting puppies
  const waitingPuppies = puppies.filter(p => p.status === "waiting");
  const orderMap = new Map(waitingPuppies.map((p, index) => [p.id, index]));
  localStorage.setItem("puppyWaitingOrder", JSON.stringify(Array.from(orderMap.entries())));
};

interface WaitingListContextType {
  puppyList: Puppy[];
  addPuppy: (puppy: Omit<Puppy, "id" | "status" | "arrivalTime">) => void;
  updatePuppyStatus: (id: string, status: PuppyStatus) => void;
  updatePuppyPosition: (fromIndex: number, toIndex: number) => void;
  removePuppy: (id: string) => void;
  getFilteredPuppies: (status?: PuppyStatus) => Puppy[];
  searchPuppies: (searchTerm: string, status?: PuppyStatus) => Puppy[];
  isLoading: boolean;
}

const WaitingListContext = createContext<WaitingListContextType | undefined>(
  undefined,
);

export const WaitingListProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Use React Query to fetch and cache puppies
  const { data: puppyList = [], isLoading } = useQuery({
    queryKey: ["puppies"],
    queryFn: getPuppiesFromStorage,
    staleTime: Infinity, // Since we're using localStorage, we don't need to refetch
  });

  // Mutation for adding a puppy
  const addPuppyMutation = useMutation({
    mutationFn: async (puppy: Omit<Puppy, "id" | "status" | "arrivalTime">) => {
      const now = new Date();
      const newPuppy: Puppy = {
        ...puppy,
        id: `puppy_${Date.now()}`,
        status: "waiting",
        arrivalTime: now.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };

      const updatedList = [...puppyList, newPuppy];
      savePuppiesToStorage(updatedList);
      return newPuppy;
    },
    onSuccess: (newPuppy) => {
      queryClient.setQueryData(["puppies"], (old: Puppy[] = []) => [
        ...old,
        newPuppy,
      ]);
      toast({
        title: "Puppy Added",
        description: `${newPuppy.name} has been added to the waiting list.`,
      });
    },
  });

  // Mutation for updating puppy status
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: PuppyStatus }) => {
      const updatedList = puppyList.map((puppy) => {
        if (puppy.id === id) {
          const now = new Date();
          const timeString = now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          });

          const updatedPuppy = { ...puppy, status };

          if (status === "in-service") {
            updatedPuppy.serviceStartTime = timeString;
          } else if (status === "completed") {
            updatedPuppy.serviceEndTime = timeString;
          }

          return updatedPuppy;
        }
        return puppy;
      });

      // Save the updated list and order
      savePuppiesToStorage(updatedList);
      return { updatedList, id, status };
    },
    onSuccess: ({ updatedList, id, status }) => {
      queryClient.setQueryData(["puppies"], updatedList);

      const puppy = puppyList.find((p) => p.id === id);
      if (puppy) {
        toast({
          title: `Status Updated: ${status.replace("-", " ")}`,
          description: `${puppy.name}'s status has been updated.`,
        });
      }
    },
  });

  // Mutation for reordering puppies
  const updatePositionMutation = useMutation({
    mutationFn: async ({
      fromIndex,
      toIndex,
    }: {
      fromIndex: number;
      toIndex: number;
    }) => {
      // Get all puppies in their current order
      const updated = [...puppyList];
      
      // Move the puppy to its new position
      const [movedPuppy] = updated.splice(fromIndex, 1);
      updated.splice(toIndex, 0, movedPuppy);

      // Save the updated list and order
      savePuppiesToStorage(updated);
      return updated;
    },
    onSuccess: (updatedList) => {
      queryClient.setQueryData(["puppies"], updatedList);
      toast({
        title: "List Reordered",
        description: "The waiting list order has been updated.",
      });
    },
  });

  // Mutation for removing a puppy
  const removePuppyMutation = useMutation({
    mutationFn: async (id: string) => {
      const updatedList = puppyList.filter((puppy) => puppy.id !== id);
      savePuppiesToStorage(updatedList);
      return { updatedList, removedPuppy: puppyList.find((p) => p.id === id) };
    },
    onSuccess: ({ updatedList, removedPuppy }) => {
      queryClient.setQueryData(["puppies"], updatedList);

      if (removedPuppy) {
        toast({
          title: "Puppy Removed",
          description: `${removedPuppy.name} has been removed from the waiting list.`,
          variant: "destructive",
        });
      }
    },
  });

  const addPuppy = (puppy: Omit<Puppy, "id" | "status" | "arrivalTime">) => {
    addPuppyMutation.mutate(puppy);
  };

  const updatePuppyStatus = (id: string, status: PuppyStatus) => {
    updateStatusMutation.mutate({ id, status });
  };

  const updatePuppyPosition = (fromIndex: number, toIndex: number) => {
    updatePositionMutation.mutate({ fromIndex, toIndex });
  };

  const removePuppy = (id: string) => {
    removePuppyMutation.mutate(id);
  };

  const getFilteredPuppies = (status?: PuppyStatus) => {
    if (!status) return puppyList;
    return puppyList.filter((puppy) => puppy.status === status);
  };

  const searchPuppies = (searchTerm: string, status?: PuppyStatus) => {
    if (!searchTerm.trim()) {
      return status ? getFilteredPuppies(status) : puppyList;
    }

    const lowerCaseSearch = searchTerm.toLowerCase().trim();

    // First filter by status if provided
    const statusFiltered = status ? getFilteredPuppies(status) : puppyList;

    // Then search within the status-filtered list
    return statusFiltered.filter((puppy) => {
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
        addPuppy,
        updatePuppyStatus,
        updatePuppyPosition,
        removePuppy,
        getFilteredPuppies,
        searchPuppies,
        isLoading,
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
