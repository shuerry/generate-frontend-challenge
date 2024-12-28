import React, { useState } from "react";
import Checkbox from "@/components/Checkbox";
import ItemCounts from "@/components/ItemCounts";
import Category from "@/components/Category";
import Rating from "@/components/Ratings";

interface ItemRowProps {
  stage: number;
  itemName: string;
  itemCategories: string[];
  itemRating: number;
  itemPrice: number;
  itemQuantity: number;
  checked: boolean;
  onCheckboxChange: (checked: boolean) => void;
  onQuantityChange: (quantity: number) => void;
}

const ItemRow: React.FC<ItemRowProps> = ({
  stage,
  itemName,
  itemCategories,
  itemRating,
  itemPrice,
  checked,
  onCheckboxChange,
  onQuantityChange,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const [itemCount, setItemCount] = useState(1);

  const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    onCheckboxChange(event.target.checked);
  };

  const handleCountChange = (newCount: number) => {
    setItemCount(newCount);
    onQuantityChange(newCount);
  };

  return (
    <div className="grid grid-cols-3 gap-x-60 my-2 p-2">
      <div className="flex flex-row space-x-10 items-center col-span-2">
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
        <div className="flex flex-row space-x-10 items-center">
          <div className="bg-neutral-400 w-28 h-28 rounded-md"></div>

          <div className="space-y-1">
            <div className="space-x-3 flex flex-row">
              <span className="text-xl">{itemName}</span>
              <div className="flex flex-wrap gap-1">
                {itemCategories.map((category, index) => (
                  <Category key={index} label={category} />
                ))}
              </div>
            </div>
            <Rating rating={itemRating} size={"text-2xl"} />
          </div>
        </div>
      </div>

      <div className="flex justify-start space-x-16">
        <ItemCounts initialValue={itemCount} onChange={handleCountChange} />
        <span className="text-lg">{formatPrice(itemPrice)}</span>
      </div>
    </div>
  );
};

export default ItemRow;
