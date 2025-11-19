import { Cobe } from "../components/Cobe";
import ReservationForm from "../components/ReservationForm";

const Form = () => {
  return (
    <main className="w-full flex justify-center gap-24">
      <ReservationForm />
      <Cobe />
    </main>
  );
};

export default Form;
