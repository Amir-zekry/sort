import Image from "next/image";
import Products from "./products";

export default function Home() {
  return (
    <div className="max-w-screen min-h-screen flex justify-center items-start mt-5 px-4">
      <Products />
    </div>
  );
}
