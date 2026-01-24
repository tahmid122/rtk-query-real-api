import SingleDoseUpdateForm from "./SingleDoseUpdateForm";
type Props = {
  params: Promise<{ id: string }>;
};
const SingleDose = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <section className="my-5 p-5 h-[70vh] flex items-center justify-center">
      <SingleDoseUpdateForm id={id} />
    </section>
  );
};

export default SingleDose;
