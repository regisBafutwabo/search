import type { Metadata } from "next";

import { Logo } from "@/components/Svg/Logo";

import { HomeSearch } from "./components/HomeSearch";

export const metadata: Metadata = {
  title: "Search - Home",
};

export default function Home() {
  return (
    <div className="flex flex-col h-full justify-center items-center gap-20 px-2 sm:px-0">
      <Logo />
      <HomeSearch />
    </div>
  );
}
