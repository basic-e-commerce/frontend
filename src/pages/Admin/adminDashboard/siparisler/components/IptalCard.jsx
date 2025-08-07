import { useEffect, useState } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";

const IptalCard = ({ item, onQuantityChange }) => {
  const [quantity, setQuantity] = useState(0);

  const arttır = () => {
    if (item.quantity > quantity) {
      setQuantity((prev) => prev + 1);
    }
  };

  const azalt = () => {
    if (quantity > 0) {
      setQuantity((prev) => prev - 1);
    }
  };

  useEffect(() => {
    onQuantityChange(quantity);
  }, [quantity]);

  return (
    <tr>
      <td>
        <img src={item.coverImage} alt={item.productName} />
      </td>
      <td>{item.productName}</td>
      <td>{item.quantity}</td>
      <td>
        <span
          style={{
            fontSize: "0.7rem",
            textDecoration: "line-through",
          }}
        >
          {item.price}
        </span>{" "}
        <br />
        {item.discountPrice}
      </td>
      <td className="controlArtıEksi">
        <div className="buttonsControl">
          <button
            onClick={() => {
              azalt();
            }}
            type="button"
          >
            <RemoveIcon fontSize="1.2rem" />
          </button>
          <span>{quantity}</span>
          <button
            type="button"
            onClick={() => {
              arttır();
            }}
          >
            <AddIcon fontSize="1.2rem" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default IptalCard;
