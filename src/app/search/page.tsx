import { Skeleton } from '@/components/common/Skeleton';
import { ResultsHeader } from '@/components/ResultsHeader';

export default function Search() {
  return (
    <div className="h-full">
      <ResultsHeader />
      <div className="px-5">
        {Array.from({ length: 10 }, (_, index: number) => (
          <Skeleton key={index} />
        ))}
      </div>
    </div>
  );
}
