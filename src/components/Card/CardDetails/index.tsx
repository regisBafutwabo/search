type CardDetailsProps = {
  id: string;
  title: string;
  imageUrl?: string | null;
  faviconUrl?: string | null;
  netloc: string;
  isSaved: boolean;
};

export const CardDetails = (props: CardDetailsProps) => {
  const { id, title, imageUrl, faviconUrl, netloc } = props;

  const defaultThumbnail = "/images/default-thumbnail.svg";
  const defaultFavicon = "/images/globe.svg";

  return (
    <div className="flex items-center gap-4">
      {/* Thumbnail */}
      <div className="w-18 h-18">
        <img
          src={imageUrl || defaultThumbnail}
          className="min-w-18 max-w-18 min-h-18 max-h-18 object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.src = defaultThumbnail;
          }}
          alt={imageUrl ? `${id}-thumbnail` : "default thumbnail"}
          loading="lazy"
        />
      </div>
      {/* Title and Link */}
      <div className="flex flex-col justify-between gap-[14px]">
        {/* Title */}
        <div className="card-header h-10">
          <p className="text-ellipsis overflow-hidden line-clamp-2">{title}</p>
        </div>
        {/* Link */}
        <div className="flex items-center gap-[6px]">
          <img
            src={faviconUrl || defaultFavicon}
            alt={
              faviconUrl ? `${id}-result-favicon` : "placeholder-result-favicon"
            }
            onError={(e) => {
              e.currentTarget.src = defaultFavicon;
            }}
            className="w-[14px] h-[14px] rounded-full object-cover "
            loading="lazy"
          />
          <p className="card-link">{netloc}</p>
        </div>
      </div>
    </div>
  );
};
