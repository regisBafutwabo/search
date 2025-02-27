import { ErrorModal } from '@/components/ErrorModal';
import { ResultsHeader } from '@/components/ResultsHeader';
import { Skeleton } from '@/components/Shared/Skeleton';

export default function Search() {
  return (
    <div className="h-full">
      <ResultsHeader />
      <div className="px-5">
        {/* {Array.from({ length: 10 }, (_, index: number) => (
          <Skeleton key={index} />
        ))} */}
        <Skeleton />
        <ErrorModal/>
      </div>
    </div>
  );
}
