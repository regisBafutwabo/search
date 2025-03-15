export const Logo = () => {
  return (
    <svg
      width="200"
      height="48"
      viewBox="0 0 200 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Search logo"
      role="img"
    >
      <defs>
        <linearGradient id="blue-teal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00B1E2" />
          <stop offset="100%" stopColor="#00D4B7" />
        </linearGradient>
      </defs>
      <text
        x="10"
        y="35"
        fontFamily="sfProText, sans-serif"
        fontSize="36"
        fontWeight="bold"
        fill="url(#blue-teal)"
      >
        SEARCH
      </text>
    </svg>
  );
};
