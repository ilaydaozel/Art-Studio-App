"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <Image
      alt="Logo"
      className="hidden md:block cutsor-pointer"
      height="50"
      width="50"
      src="/images/logo.png"
    ></Image>
  );
};

export default Logo;
