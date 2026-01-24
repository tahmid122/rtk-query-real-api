import { Medicine } from "@/types/medicine";
import Link from "next/link";
import { FaTrash } from "react-icons/fa";
import { Button } from "../ui/button";
import { useDeleteADoseMutation } from "@/redux/api/doseApi";
import { toast } from "sonner";
type Props = {
  medicine: Medicine;
};
const MedicineCard = ({ medicine }: Props) => {
  const [deleteADose, { isLoading, isError, isSuccess }] =
    useDeleteADoseMutation();
  if (isError) toast("Something went wrong to delete");
  //   Delete a dose
  const handleDeleteADose = async () => {
    const { data } = await deleteADose(medicine.id);
    if (data?.success) {
      toast.success("Successfully deleted");
    }
  };
  return (
    <div
      className={`max-w-md rounded-2xl border border-gray-200 bg-white p-5 shadow-sm ${isLoading && "animate-pulse"}`}
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
          <span className="font-semibold">{medicine.remainingDose} pills</span>
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
          <Link href={`doses/${medicine.id}`} className="flex-1 w-full">
            <Button className="flex-1 cursor-pointer">View Details</Button>
          </Link>
          <Button
            onClick={handleDeleteADose}
            disabled={isLoading}
            className={`bg-red-500 hover:bg-red-700 cursor-pointer`}
          >
            <FaTrash className={`${isLoading && "animate-spin"}`} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MedicineCard;
