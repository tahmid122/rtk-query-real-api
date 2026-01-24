"use client";

import { useGetAllDoseQuery } from "@/redux/api/doseApi";
import { Medicine } from "@/types/medicine";
import MedicineCard from "../reuseable/MedicineCard";
import CardSkeleton from "../reuseable/CardSkeleton";

const Doses = () => {
  const { data: doses, isLoading, isError } = useGetAllDoseQuery(null);
  if (isError) return <p>Something went wrong</p>;
  if (isLoading) return <CardSkeleton count={4} />;
  return (
    <section className="grid grid-cols-4 gap-5">
      {doses?.data &&
        doses.data.map((dose: Medicine) => (
          <MedicineCard medicine={dose} key={dose.id} />
        ))}
      {doses?.data.length === 0 && <p>No doses found</p>}
    </section>
  );
};

export default Doses;
