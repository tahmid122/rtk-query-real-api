"use client";

import { useAddADoseMutation } from "@/redux/api/doseApi";
import { Dispatch, SetStateAction, useState } from "react";
type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};
const AddDoseForm = ({ setOpen }: Props) => {
  const [addDose, { isLoading, isError }] = useAddADoseMutation();
  const [formData, setFormData] = useState({
    doseName: "",
    doseAmount: "",
    medicineType: "PILL",
    medicineTimes: [""],
    startDate: "",
    endDate: "",
    note: "",
    notificationEnabled: true,
    totalPills: 0,
    takenPills: 0,
    slotType: "SMALL",
    slotColorCode: "#4CAF50",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : value,
    }));
  };

  const handleTimeChange = (index: number, value: string) => {
    const updatedTimes = [...formData.medicineTimes];
    updatedTimes[index] = `${value} AM`;
    setFormData({ ...formData, medicineTimes: updatedTimes });
  };

  const addTimeField = () => {
    setFormData((prev) => ({
      ...prev,
      medicineTimes: [...prev.medicineTimes, ""],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      doseName: formData.doseName,
      medicineType: formData.medicineType,
      slotType: formData.slotType,
      slotColorCode: formData.slotColorCode,
      note: formData.note,
      totalPills: formData.totalPills,
      doseAmount: formData.doseAmount,
      startDate: new Date(formData.startDate).toISOString(),
      endDate: new Date(formData.endDate).toISOString(),
      medicineTimes: ["08:30 AM", "08:30 PM"],
      isActive: true,
      notificationEnabled: formData.notificationEnabled,
    };
    const data = await addDose(payload);
    console.log(data);
    setOpen((prev) => !prev);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full space-y-5 bg-white p-6"
    >
      {/* Dose Name */}
      <div>
        <label className="label">Dose Name</label>
        <input
          type="text"
          name="doseName"
          value={formData.doseName}
          onChange={handleChange}
          className="input"
          placeholder="Morning Dose"
          required
        />
      </div>

      {/* Dose Amount */}
      <div>
        <label className="label">Dose Amount</label>
        <input
          type="text"
          name="doseAmount"
          value={formData.doseAmount}
          onChange={handleChange}
          className="input"
          placeholder="500mg"
          required
        />
      </div>

      {/* Medicine Type */}
      <div>
        <label className="label">Medicine Type</label>
        <select
          name="medicineType"
          value={formData.medicineType}
          onChange={handleChange}
          className="input"
        >
          <option>PILL</option>
          <option>SYRUP</option>
          <option>INJECTION</option>
        </select>
      </div>

      {/* Medicine Times */}
      <div>
        <label className="label">Medicine Times</label>
        {formData.medicineTimes.map((time, index) => (
          <input
            key={index}
            type="time"
            value={time.split(" ")[0]}
            onChange={(e) => handleTimeChange(index, e.target.value)}
            className="input mb-2"
            required
          />
        ))}
        <button
          type="button"
          onClick={addTimeField}
          className="text-sm text-blue-600 hover:underline"
        >
          + Add another time
        </button>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Start Date</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="input"
            required
          />
        </div>

        <div>
          <label className="label">End Date</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
      </div>

      {/* Pills */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="label">Total Pills</label>
          <input
            type="number"
            name="totalPills"
            value={formData.totalPills}
            onChange={handleChange}
            className="input"
            min={0}
          />
        </div>

        <div>
          <label className="label">Taken Pills</label>
          <input
            type="number"
            name="takenPills"
            value={formData.takenPills}
            onChange={handleChange}
            className="input"
            min={0}
          />
        </div>
      </div>

      {/* Slot Type */}
      <div>
        <label className="label">Slot Type</label>
        <select
          name="slotType"
          value={formData.slotType}
          onChange={handleChange}
          className="input"
        >
          <option>SMALL</option>
          <option>MEDIUM</option>
          <option>LARGE</option>
        </select>
      </div>

      {/* Color Picker */}
      <div>
        <label className="label">Slot Color</label>
        <input
          type="color"
          name="slotColorCode"
          value={formData.slotColorCode}
          onChange={handleChange}
          className="h-10 w-full cursor-pointer rounded"
        />
      </div>

      {/* Note */}
      <div>
        <label className="label">Note</label>
        <textarea
          name="note"
          value={formData.note}
          onChange={handleChange}
          className="input"
          placeholder="Take after breakfast"
        />
      </div>

      {/* Notification */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-700">Enable Notifications</span>
        <input
          type="checkbox"
          checked={formData.notificationEnabled}
          onChange={() =>
            setFormData((prev) => ({
              ...prev,
              notificationEnabled: !prev.notificationEnabled,
            }))
          }
          className="h-5 w-5"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-xl bg-primary/90 py-2 font-medium text-white hover:bg-primary/80 cursor-pointer"
      >
        {isLoading ? "Saving..." : "Save Medicine"}
      </button>
    </form>
  );
};

export default AddDoseForm;
