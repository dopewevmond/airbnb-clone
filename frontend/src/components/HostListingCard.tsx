type Props = {
  imageSource: string;
  name: string;
};

export const HostListingCard = ({ imageSource, name }: Props) => {
  return (
    <div className="w-100 mb-4">
      <img
        alt={name}
        src={imageSource}
        style={{
          width: "100%",
          height: "13em",
          objectFit: "cover",
          borderRadius: "1em",
        }}
      />
      <div className="p-0 mt-2">
        <div className="text-capitalize" style={{ fontWeight: "500" }}>
          {name}
        </div>
      </div>
    </div>
  );
};
