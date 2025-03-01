type CardDetailsProps = {
  id: string;
  title: string;
  imageUrl?: string | null;
  faviconUrl?: string | null;
  netloc: string;
  url: string;
};

export const CardDetails = (props: CardDetailsProps) => {
  const { id, title, imageUrl, faviconUrl, netloc, url } = props;

  const defaultThumbnail = "/images/default-thumbnail.svg";
  const defaultFavicon = "/images/globe.svg";

  return (
    <div className="flex items-center gap-4">
      {/* Thumbnail */}
      <div className="w-18 h-18">
        <img
          src={imageUrl || defaultThumbnail}
          className="h-full w-full min-h-18 min-w-18 object-cover rounded-xl"
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
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="card-header h-10"
        >
          <p className="text-ellipsis overflow-hidden line-clamp-2">{title}</p>
        </a>
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
            className="w-[14px] h-[14px] rounded-full object-cover min-w-[14px] min-h-[14px]"
            loading="lazy"
          />
          <p className="card-link">{netloc}</p>
        </div>
      </div>
    </div>
  );
};
