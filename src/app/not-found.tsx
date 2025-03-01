import { Logo } from "@/components/Svg/Logo";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <Logo />
      <h1 className="font-bold">404 - Page Not Found</h1>
      <p className="mt-4 sm:text-lg text-gray-500">
        Sorry, the page you are looking for does not exist.
      </p>
      <a
        href="/"
        style={{
          // For Safari
          color: "var(--color-bd-active)",
        }}
        className="mt-6 text-bd-active hover:underline"
      >
        Go back to Home
      </a>
    </div>
  );
};

export default NotFoundPage;
