import { FaSpinner } from "react-icons/fa";
import usePolling from "../../hooks/usePolling";
import "./Details.css";

export type Info = {
  id: number;
  name: string;
};

type DetailsData = {
  avatar: string;
  name: string;
  id: string;
  details: {
    position: string;
    company: string;
    city: string;
  };
};

type Props = {
  info: Info;
};

export const Details = ({ info }: Props) => {
  const {
    data: details,
    isLoading,
    error,
  } = usePolling<DetailsData>(
    `${process.env.REACT_APP_DETAILS_URL}${info.id}.json`
  );

  if (!details) {
    return null;
  }

  return (
    <div className="details-wrapper" data-id={details.id}>
      <h4 className="details-title">Details</h4>
      {isLoading ? (
        <div className="loader">
          <FaSpinner className="spin" />
        </div>
      ) : (
        <>
          <img src={details.avatar} alt={details.name} className="avatar" />
          <div className="name">{details.name}</div>
          <div className="details-item">
            <span className="details-label">City:</span>{" "}
            {details.details && details.details.city}
          </div>
          <div className="details-item">
            <span className="details-label">Company:</span>{" "}
            {details.details && details.details.company}
          </div>
          <div className="details-item">
            <span className="details-label">Position:</span>{" "}
            {details.details && details.details.position}
          </div>
        </>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
