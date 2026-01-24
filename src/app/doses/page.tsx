import Doses from "@/components/home/Doses";
import DialogClient from "./DialogClient";

const Dose = () => {
  return (
    <div className="my-5 p-5">
      <div className="flex items-center justify-between">
        <h1 className="text-center font-bold text-3xl mb-10">All Doses</h1>
        {/* action buttons */}
        <div>
          <DialogClient />
        </div>
        {/* form */}
      </div>
      {/* Add dose form */}

      {/* Dose */}
      <Doses />
    </div>
  );
};

export default Dose;
