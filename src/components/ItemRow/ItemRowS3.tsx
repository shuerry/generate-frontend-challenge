import React from 'react';
import Category from "@/components/Category";
import Rating from "@/components/Ratings";

interface ItemRowProps {
    stage: number;
    itemName: string;
    itemCategories: string[];
    itemRating: number;
    itemPrice: number;
    itemQuantity: number;
}

const ItemRowS3: React.FC<ItemRowProps> = ({stage, itemName, itemCategories, itemRating, itemPrice, itemQuantity}) => {
    const formatPrice = (price: number): string => {
        return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
      };

      return (
        <div className="grid grid-cols-6 gap-x-32 mx-7 my-4 px-6">
                    <div className="flex flex-row space-x-10 items-center col-span-4">
                        <div className="flex flex-row space-x-10 items-center">
                            <div className="bg-neutral-400 w-28 h-28 rounded-md"></div>

                            <div className="space-y-1">
                                <div className="space-x-3 flex flex-row">
                                    <span className="text-lg">{itemName}</span>
                                    <div className='flex flex-wrap gap-1'>
                                        {itemCategories.map((category, index) => (
                                            <Category key={index} label={category} />
                                        ))}
                                    </div>
                                </div>
                                <Rating rating={itemRating} size={"text-xl"} />
                            </div>
                        </div>
                    </div>

                    <div className='flex text-lg justify-start space-x-16 text-lg col-span-1'>
                        <span>{itemQuantity}</span>
                    </div>

                    <div className="flex text-lg justify-start space-x-16 col-span-1">
                        <span>{formatPrice(itemPrice)}</span>
                    </div>
                </div>
      );
}

export default ItemRowS3;