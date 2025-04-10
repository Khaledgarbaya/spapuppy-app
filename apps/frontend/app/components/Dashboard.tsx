"use client";

import { Separator } from "@radix-ui/react-context-menu";
import Header from "./Header";
import AddPuppyForm from "./AddPuppyForm";
import WaitingList from "./WaitingList";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-puppy-purple-light/20 to-puppy-blue/20 p-4 md:p-8">
      <div className="container max-w-7xl mx-auto space-y-6">
        <Header /> 

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <AddPuppyForm />
          </div>

          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
            <WaitingList />
          </div>
        </div>

        <footer className="text-center text-sm text-muted-foreground mt-8">
          <Separator className="mb-4" />
          <p>© 2025 Puppy Spa - Waiting List Manager</p>
        </footer>
      </div>
    </div>
  );
} 
