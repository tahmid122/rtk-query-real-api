"use client";
import { Button } from "@/components/ui/button";
import AddDoseForm from "./AddDoseForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
const DialogClient = () => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Dose</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] min-w-[50%] overflow-y-auto">
        <DialogTitle className="text-xl font-semibold text-gray-800">
          Add Medicine
        </DialogTitle>
        <AddDoseForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default DialogClient;
