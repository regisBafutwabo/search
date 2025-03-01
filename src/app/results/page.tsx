import { redirect } from "next/navigation";

import { ResultsWrapper } from "./components/ResultsWrapper";

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
  const timestamp = searchParams.timestamp;

  if (searchKey === "") redirect("/");

  return (
    <div className="h-full">
      <ResultsWrapper searchKey={searchKey} timestamp={timestamp} />
    </div>
  );
}
