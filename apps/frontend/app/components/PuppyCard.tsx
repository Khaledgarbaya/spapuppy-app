"use client";
import { Puppy } from "@repo/types";
import { useWaitingList } from "../context/WaitingListContext";
import { Button } from "@repo/ui/components/ui/button";

export default function PuppyCard({puppy}: {puppy: Puppy}) {
  const { updatePuppyStatus, removePuppy } = useWaitingList();
  console.log(puppy);
  const handleStatusChange = () => {
    if (puppy.status === "waiting") {
      updatePuppyStatus(puppy.id, "in_progress");
    } else if (puppy.status === "in_progress") {
      updatePuppyStatus(puppy.id, "completed");
    }
  };

  const handleCancel = () => {
    if (puppy.status === "waiting") {
      updatePuppyStatus(puppy.id, "cancelled");
    } else if (puppy.status === "cancelled") {
      updatePuppyStatus(puppy.id, "waiting");
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border" data-testid="puppy-card">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold" data-testid="puppy-name">{puppy.name}</h3>
          <p className="text-sm text-gray-600" data-testid="puppy-breed">{puppy.breed}</p>
        </div>
        <div className="flex gap-2">
          {puppy.status !== "completed" && puppy.status !== "cancelled" && (
            <Button
              onClick={handleStatusChange}
              variant="outline"
              className="text-sm"
              data-testid="status-button"
            >
              {puppy.status === "waiting" ? "Start Service" : "Complete"}
            </Button>
          )}
          {(puppy.status === "waiting" || puppy.status === "cancelled") && (
            <Button
              onClick={handleCancel}
              variant={puppy.status === "cancelled" ? "outline" : "destructive"}
              size="sm"
              data-testid="cancel-button"
            >
              {puppy.status === "cancelled" ? "Uncancel" : "Cancel"}
            </Button>
          )}
          <Button
            onClick={() => removePuppy(puppy.id)}
            variant="destructive"
            size="sm"
            data-testid="remove-button"
          >
            Remove
          </Button>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Owner</p>
          <p className="text-sm">{puppy.ownerName}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-sm">{puppy.ownerPhone}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Service</p>
          <p className="text-sm">{puppy.service}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="text-sm capitalize">{puppy.status?.replace("_", " ")}</p>
        </div>
      </div>

      {puppy.notes && (
        <div className="mt-4">
          <p className="text-sm text-gray-500">Notes</p>
          <p className="text-sm">{puppy.notes}</p>
        </div>
      )}

      <div className="mt-4 text-xs text-gray-400">
        <p>Arrived: {puppy.arrivalTime}</p>
        {puppy.serviceStartTime && <p>Started: {puppy.serviceStartTime}</p>}
        {puppy.serviceEndTime && <p>Completed: {puppy.serviceEndTime}</p>}
      </div>
    </div>
  );
} 
