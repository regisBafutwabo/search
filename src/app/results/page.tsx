import { redirect } from "next/navigation";

import { ResultContainer } from "./components/ResultContainer";
import { ResultsHeader } from "./components/ResultsHeader";

type SearchParams = Promise<{
  [key: string]: string | undefined;
}>;

export async function generateMetadata(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const searchKey = searchParams.search;

  return {
    title: `${searchKey}`,
  };
}

export default async function ResultsPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const searchKey = searchParams.search;

  if (searchKey === "") redirect("/");

  return (
    <div className="h-full relative">
      <ResultsHeader searchKey={searchKey} />
      <ResultContainer searchValue={searchKey} />
    </div>
  );
}
