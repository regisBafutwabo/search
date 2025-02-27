type SearchIconsProps = {
  active?: boolean;
};

export const SearchIcon = ({ active }: SearchIconsProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Search Icon</title>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.11 4.03002C18.81 6.74002 19.33 10.8 17.66 14.02L22.11 18.46C22.91 19.27 22.91 20.58 22.11 21.38L21.35 22.14C20.96 22.53 20.44 22.74 19.89 22.74C19.34 22.74 18.82 22.53 18.43 22.14L13.98 17.69C12.75 18.33 11.4 18.65 10.05 18.65C7.86 18.65 5.66999 17.81 3.99999 16.14C0.659995 12.8 0.659995 7.38002 3.99999 4.03002C5.66999 2.36002 7.86 1.53002 10.06 1.52002C12.25 1.52002 14.44 2.36002 16.11 4.03002ZM5.05999 5.09002C2.30999 7.85002 2.30999 12.33 5.05999 15.08C6.39 16.42 8.17 17.15 10.05 17.15C11.93 17.15 13.71 16.41 15.04 15.08C17.79 12.32 17.79 7.84002 15.04 5.09002C13.71 3.75002 11.94 3.02002 10.05 3.02002C8.17 3.02002 6.39 3.76002 5.05999 5.09002ZM20.29 21.08L21.05 20.32C21.26 20.1 21.26 19.75 21.05 19.53L16.92 15.4L15.37 16.95L19.5 21.08C19.71 21.29 20.08 21.29 20.29 21.08ZM5.67 7.49002C5.96 7.20002 6.44 7.20002 6.73 7.49002C7.02 7.79002 7.02 8.26002 6.73 8.55002C5.88 9.40002 5.88 10.77 6.73 11.62C7.02 11.91 7.02 12.39 6.73 12.68C6.58 12.83 6.39 12.9 6.2 12.9C6.00999 12.9 5.82 12.83 5.67 12.68C4.24 11.25 4.24 8.92002 5.67 7.49002Z"
        fill={active ? "#00C3CC" : "#959CA6"}
      />
    </svg>
  );
};
