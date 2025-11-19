import Link from "next/link";
import Button from "./components/Button";
import { Cobe } from "./components/Cobe";

const Home = () => {
  return (
    <main className="w-full flex justify-center">
      <div className="max-w-1/2 w-full flex justify-between">
        <div>
          <p>
            Wypełnij formularz wycieczkowy, a do Ciebie oddzwonimy, aby ustalić
            szczegóły!
          </p>
          bv
          <Link href={"/form"}>
            <Button>Wypełnij formularz.</Button>
          </Link>
        </div>
        <Cobe />
      </div>
    </main>
  );
};
export default Home;
