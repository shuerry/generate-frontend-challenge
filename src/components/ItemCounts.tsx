import React, { useState } from 'react';
import Icon from "@/components/Icons";

interface ItemCountsProps {
    initialValue: number;
    onChange: (newValue: number) => void;
}


const ItemCounts: React.FC<ItemCountsProps> = ({ initialValue, onChange }) => {

  const increment = () => {
    onChange(initialValue + 1)
  }

  const decrement = () => {
    if (initialValue <= 1) {
      onChange(1);
    } else {
      onChange(initialValue - 1)
    }
  }
    return (
      <div className="flex h-8 items-center space-x-2 border border-gray-300 rounded-lg mt-1">
        <button type="button" onClick={decrement} className="p-2">
          <Icon name="minus" size={13} />
        </button>
        <span className="text-lg">{initialValue}</span>
        <button type="button" onClick={increment} className="p-2">
          <Icon name="plus" size={13} />
        </button>
    </div>
    );
  };
  
export default ItemCounts;