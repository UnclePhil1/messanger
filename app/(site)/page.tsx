import React from "react";
import Image from "next/image";
import { AuthForm } from "./components/authForm";

export default function Home() {
  return (
    <div className="w-[100%] h-auto lg:h-[100%] relative grid grid-cols-1 lg:grid-cols-2 justify-center self-center items-center py-4 my-auto px-[5%] bg-gray-50">
      <Image
        src={"/images/sign.png"}
        width={700}
        height={300}
        className="w-full h-auto hidden lg:block"
        alt={"logo.png"}    
      />
      <div className="w-[100%] h-[100%] flex flex-col justify-center items-center md:pt-[15%]">
        <Image
          src={"/images/logo.png"}
          width={100}
          height={100}
          className="w-auto h-auto"
          alt={"logo.png"}
        />
        <AuthForm />
      </div>
    </div>
  );
}
