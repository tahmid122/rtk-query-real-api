"use client";

import { Button } from "@/components/ui/button";
import {
  useGetSingleDoseQuery,
  useUpdateSingleDoseMutation,
} from "@/redux/api/doseApi";
import { ChangeEvent, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Medicine } from "@/types/medicine";
import { toast } from "sonner";
type Props = {
  id: string;
};
const SingleDoseUpdateForm = ({ id }: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const { data, isLoading, isError } = useGetSingleDoseQuery(id);
  const [updateSingleDose, { isLoading: isUpdating }] =
    useUpdateSingleDoseMutation();
  const [newName, setNewName] = useState<string>("");

  if (isLoading) return <p>Dose details is loading....</p>;
  const medicine: Medicine = data?.data;
  //   handle change
  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = await updateSingleDose({ id: id, name: newName });
    if (data?.data?.success) {
      setOpen(false);
      toast.success("Updated successfully");
    }
  };
  return (
    <div>
      {" "}
      <div
        className={`max-w-md w-100 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${isLoading && "animate-pulse"}`}
        style={{ borderLeft: `6px solid ${medicine?.slotColorCode}` }}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {medicine.doseName}
          </h2>
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            {medicine.medicineType}
          </span>
        </div>

        {/* Dose Info */}
        <p className="mt-1 text-sm text-gray-600">
          Dose: <span className="font-medium">{medicine.doseAmount}</span>
        </p>

        {/* Time Info */}
        <div className="mt-4 space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Medicine Times</span>
            <span className="font-medium">
              {medicine?.medicineTimes?.join(", ")}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Next Dose</span>
            <span className="font-semibold text-blue-600">
              {medicine.nextDoseTime}
            </span>
          </div>

          <div className="flex justify-between">
            <span>Remaining Time</span>
            <span className="font-medium">{medicine.remainingTime}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-gray-500">
            <span>Progress</span>
            <span>
              {medicine.takenPills}/{medicine.totalPills} taken
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-green-500"
              style={{
                width: `${(medicine.takenPills / medicine.totalPills) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 space-y-2 text-sm text-gray-600">
          <p>
            <span className="font-medium">Note:</span> {medicine.note}
          </p>

          <div className="flex justify-between">
            <span>Remaining Dose</span>
            <span className="font-semibold">
              {medicine.remainingDose} pills
            </span>
          </div>

          <div className="flex justify-between">
            <span>Notifications</span>
            <span
              className={`font-medium ${
                medicine.notificationEnabled ? "text-green-600" : "text-red-500"
              }`}
            >
              {medicine.notificationEnabled ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-2 mt-5 cursor-pointer">
            <Button onClick={() => setOpen(true)} className="cursor-pointer">
              Update Dose
            </Button>
          </div>
        </div>
      </div>
      {/* update form */}
      <div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            {/* <Button>Add Dose</Button> */}
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] min-w-[20%] overflow-y-auto">
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Update Dose
            </DialogTitle>
            <form onSubmit={handleSubmit}>
              <div>
                <label className="label">Dose Name</label>
                <input
                  type="text"
                  name="doseName"
                  defaultValue={medicine?.doseName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="input"
                  placeholder="Morning Dose"
                  required
                />
              </div>
              <Button className="mt-5 cursor-pointer" disabled={isUpdating}>
                {isUpdating ? "Changing.." : "Make change"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SingleDoseUpdateForm;
