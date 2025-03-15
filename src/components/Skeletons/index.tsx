type SkeletonsProps = {
  count: number;
};
export const Skeletons = ({ count }: SkeletonsProps) => (
  <>
    {Array.from({ length: count }, (_, index: number) => (
      // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
      <div className="flex py-4 px-5 gap-4" key={`skeleton-${index}`}>
        <div className="animate-pulse w-18 h-18 rounded-xl bg-search-gray" />
        <div className="flex flex-col gap-[31px]">
          <div className="animate-pulse w-50 sm:w-[457px] h-5 rounded-sm bg-search-gray" />
          <div className="animate-pulse w-20 sm:w-40 h-[14px] rounded-sm bg-search-gray" />
        </div>
      </div>
    ))}
  </>
);
