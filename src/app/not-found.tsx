import Image from "next/image";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Image src="/images/logo.svg" alt="logo" width={250} height={48} />
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4 text-lg text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <a href="/" className="mt-6 text-blue-500 hover:underline">
        Go back to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
