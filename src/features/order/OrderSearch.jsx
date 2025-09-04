import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function OrderSearch() {
  const [orderNo, setOrderNo] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    if (
      !orderNo ||
      orderNo.at(0) === " " ||
      orderNo.at(orderNo.length - 1) === " "
    )
      return;

    setOrderNo("");
    navigate(`/order/${orderNo}`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Search order #"
        className="w-36 rounded-full bg-yellow-100 px-4 py-2 text-sm font-medium transition-all duration-200 placeholder:text-stone-400 focus:w-40 focus:outline-yellow-300 sm:w-64 sm:focus:w-72"
        value={orderNo}
        onChange={(e) => setOrderNo(e.target.value)}
      />
    </form>
  );
}
