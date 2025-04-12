"use client";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@repo/ui/components/ui/select";
import { Button } from "@repo/ui/components/ui/button";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { Input } from "@repo/ui/components/ui/input";
import { Textarea } from "@repo/ui/components/ui/textarea";
import { z } from "zod";
import { Service } from "@repo/types";
import { useWaitingList } from "../context/WaitingListContext";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Puppy name is required" }),
  breed: z.string().min(1, { message: "Breed is required" }),
  ownerName: z.string().min(1, { message: "Owner name is required" }),
  ownerPhone: z.string().min(5, { message: "Please enter a valid phone number" }),
  service: z.enum([
    "Bath",
    "Haircut",
    "Nail Trim",
    "Full Grooming",
    "Wash & Blow Dry",
  ] as [Service, ...Service[]]),
  notes: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function AddPuppyForm() {
  const { addPuppy } = useWaitingList();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      breed: "",
      ownerName: "",
      ownerPhone: "",
      service: "Bath",
      notes: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    const puppyData = {
      name: data.name,
      breed: data.breed,
      ownerName: data.ownerName,
      ownerPhone: data.ownerPhone,
      service: data.service,
      notes: data.notes || "",
    };

    addPuppy(puppyData);
    form.reset();
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-puppy-purple-dark">
        Add New Puppy
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Puppy Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Buddy" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="breed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Breed</FormLabel>
                  <FormControl>
                    <Input placeholder="Golden Retriever" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Smith" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ownerPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="+1 (555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="service"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Service</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Bath">Bath</SelectItem>
                    <SelectItem value="Haircut">Haircut</SelectItem>
                    <SelectItem value="Nail Trim">Nail Trim</SelectItem>
                    <SelectItem value="Full Grooming">Full Grooming</SelectItem>
                    <SelectItem value="Wash & Blow Dry">Wash & Blow Dry</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Notes (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any special instructions or notes about the puppy"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-puppy-purple hover:bg-puppy-purple-dark"
          >
            Add to Waiting List
          </Button>
        </form>
      </Form>
    </div>
  );
} 
