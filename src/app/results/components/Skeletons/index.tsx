import { Skeleton } from "@/components/Shared/Skeleton";

type SkeletonsProps = {
  count: number;
};
export const Skeletons = ({ count }: SkeletonsProps) => (
  <>
    {Array.from({ length: count }, (_, index: number) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <Skeleton key={`skeleton-${index}`} />
    ))}
  </>
);
