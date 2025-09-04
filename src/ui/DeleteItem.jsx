import { useDispatch } from "react-redux";
import Button from "./Button";
import { removeItem } from "../features/cart/cartSlice";
import deleteIcon from "../assets/deleteIcon.svg";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(removeItem(pizzaId))}>
      <img src={deleteIcon} className="size-5" alt="delete icon" />
    </Button>
  );
}
