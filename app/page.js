import Image from "next/image";
import Products from "./products";

export default function Home() {
  return (
    <div className="w-screen flex justify-center items-center px-4">
      <Products />
    </div>
  );
}
