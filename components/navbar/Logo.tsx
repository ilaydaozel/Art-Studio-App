"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cutsor-pointer"
      height="40"
      width="40"
      src="/images/logo.png"
    ></Image>
  );
};

export default Logo;
