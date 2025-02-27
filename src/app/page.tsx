import Image from 'next/image';

import { Search } from '@/components/Search';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-20">
      <Image
        src="/images/logo.svg"
        unoptimized
        priority
        alt="logo"
        width={250}
        height={48}
      />
      <Search />
    </div>
  );
}
