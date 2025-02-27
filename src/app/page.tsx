import type { Metadata } from "next";
import Image from "next/image";

import { HomeSearch } from "@/components/HomeSearch";

export const metadata: Metadata = {
  title: "Liner Challenge - Home",
};

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-20">
      <Image
        src="/images/logo.svg"
        unoptimized
        priority
        alt="logo"
        width={250}
        height={48}
      />
      <HomeSearch />
    </div>
  );
}
