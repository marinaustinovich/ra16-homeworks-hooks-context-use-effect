import "./List.css";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
import usePolling from "../../hooks/usePolling";
import { Details, Info } from "../Details";

export const List = () => {
  const [selectedItem, setSelectedItem] = useState<Info | null>(null);
  const {
    data: list,
    isLoading,
    error,
  } = usePolling<Info[]>(`${process.env.REACT_APP_LIST_URL}`);

  const handleItemClick = (item: Info) => {
    setSelectedItem(item);
  };

  return (
    <div className="list-wrapper">
      <div className="list">
        <h3>List</h3>
        {isLoading ? (
          <div className="loader">
            <FaSpinner className="spin" />
          </div>
        ) : (
          <ul className="list-items">
            {list?.map((item: Info) => (
              <li
                key={item.id}
                className={`list-item${
                  item === selectedItem ? " selected" : ""
                }`}
                onClick={() => handleItemClick(item)}
              >
                {item.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {error && <p className="error">{error}</p>}
      {selectedItem && <Details info={selectedItem} />}
    </div>
  );
};
