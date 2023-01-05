import { Spinner } from "react-bootstrap";
import { navBarHeight } from "../utils/constants";

export const FullPageLoader = () => {
  return (
    <div className="d-flex align-items-center" style={{ height: `calc(70vh - ${navBarHeight})` }}>
      <Spinner className="d-block mx-auto" variant="danger" />
    </div>
  );
};
