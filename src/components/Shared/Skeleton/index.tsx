export const Skeleton = () => {
  return (
    <div className="flex py-4 px-5 gap-4">
      <div className="animate-pulse w-18 h-18 rounded-xl bg-liner-gray" />
      <div className="flex flex-col gap-[31px]">
        <div className="animate-pulse w-50 sm:w-[457px] h-5 rounded-sm bg-liner-gray" />
        <div className="animate-pulse w-20 sm:w-40 h-[14px] rounded-sm bg-liner-gray" />
      </div>
    </div>
  );
};
