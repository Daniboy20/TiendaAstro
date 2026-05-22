import React from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";

type CartItem = {
  id: string;
  quantity: number;
};

interface Props {
  item: CartItem;
  type: "plus" | "minus";
}

const EditItemQuantityButton: React.FC<Props> = ({ type }) => {
  return (
    <button
      type="button"
      aria-label={type === "plus" ? "Increase item quantity" : "Reduce item quantity"}
      className={`ease flex h-full min-w-[36px] max-w-[36px] items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80 ${
        type === "minus" ? "ml-auto" : ""
      }`}
    >
      {type === "plus" ? (
        <FaPlus className="h-4 w-4 dark:text-neutral-500" />
      ) : (
        <FaMinus className="h-4 w-4 dark:text-neutral-500" />
      )}
    </button>
  );
};

export default EditItemQuantityButton;