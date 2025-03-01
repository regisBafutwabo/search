import type { Metadata } from "next";

import { HomeSearch } from "@/components/HomeSearch";
import { Logo } from "@/components/Icons/Logo";

export const metadata: Metadata = {
  title: "Liner Challenge - Home",
};

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-20 px-2 sm:px-0">
      <Logo />
      <HomeSearch />
    </div>
  );
}
