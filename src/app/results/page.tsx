import { ErrorModal } from '@/components/ErrorModal';
import { ResultsHeader } from '@/components/ResultsHeader';
import { Skeleton } from '@/components/Shared/Skeleton';

type SearchParams = Promise<{ [key: string]: string | undefined }>;

export async function generateMetadata(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const searchKey = searchParams.search;

  return {
    title: `${searchKey}`,
  };
}

export default async function Search(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const searchKey = searchParams.search;

  return (
    <div className="h-full">
      <ResultsHeader searchKey={searchKey} />
      <div className="px-5">
        {/* {Array.from({ length: 10 }, (_, index: number) => (
          <Skeleton key={index} />
        ))} */}
        <Skeleton />
        <ErrorModal />
      </div>
    </div>
  );
}
