import { Card } from "react-bootstrap";
import { capitalizeFirstCharacter as CAP } from "../utils/capitalize";

type Props = {
  imageSource: string;
  city: string;
  country: string;
  price: number
};

export const ListingCard = ({ imageSource, city, country, price }: Props) => {
  return (
    <Card className="w-100">
      <Card.Img
        variant="top"
        src={imageSource}
        style={{ width: "100%", height: "13em", objectFit: "cover" }}
      />
      <Card.Body className="border p-2">
        <Card.Title> <small> {`${CAP(city)}, ${CAP(country)}`} </small></Card.Title>
        <Card.Text>
          <small>
            {`$${price}/night`}
          </small>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
