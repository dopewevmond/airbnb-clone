type Props = {
  imageSource: string;
  city: string;
  country: string;
  price: number;
};

export const ListingCard = ({ imageSource, city, country, price }: Props) => {
  return (
    <div className="w-100 mb-4">
      <img
        alt={`listing in ${city}`}
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
          {`${city}, ${country}`}
        </div>
        <div className="text-secondary">
          <small>Individual host</small>
        </div>
        <div className="text-decoration-underline">
          <span style={{ fontWeight: "500" }}>{`$${price}`}</span>
          <span> per night</span>
        </div>
      </div>
    </div>
  );
};
