type EmptySearchResultProps = {
  searchValue: string;
  hasError: boolean;
};

export const EmptySearchResult = ({
  searchValue,
  hasError,
}: EmptySearchResultProps) => (
  <div className="text-center py-10 px-2">
    <p className="text-gray-500">
      {hasError
        ? `Something went wrong while searching for "${searchValue}".`
        : `No results found for "${searchValue}".`}
    </p>
  </div>
);
