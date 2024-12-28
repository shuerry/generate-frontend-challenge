"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Stepper from "@/components/Stepper";
import ItemRow from "@/components/ItemRow/ItemRowS3";
import { useRouter } from "next/navigation";
import {useSelectedItems} from "@/app/Contexts/productsContext";

interface Product {
  id: string;
  name: string;
  categories: string[];
  stars: number;
  price: number;
}

const PaymentPage: React.FC = () => {
  const router = useRouter();

  const { selectedItems, setSelectedItems } = useSelectedItems();
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProductDetails = async (productId: string) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }
      return await response.json();
    } catch (err: any) {
      console.error("Error fetching products:", err.message);
    }
  };

  const fetchProducts = async () => {
    try {
      // Extract product IDs from selectedItems and make sure to get unique ones
      const productDetailsPromises = Object.keys(selectedItems).map(
        (productId) => {
          console.log(productId);
          return fetchProductDetails(productId);
        }
      );

      // Wait for all product details to be fetched concurrently
      const data = await Promise.all(productDetailsPromises);
      setProductList(data);
    } catch (err: any) {
      console.error("Error fetching product details:", err.message);
    }
    console.log(productList);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedItems]);

  const handleDashboard = async () => {
    setProductList([]);
    setSelectedItems({});
    router.push(`/AddToCart`);
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const totalCost = productList.reduce((total, product) => {
    const selectedItem = selectedItems[product.id];
    return total + (selectedItem?.quantity || 1) * product.price;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto px-64 py-5">
        <Stepper activeStep={3} />
      </div>
      <div className="text-center m-9">
        <span className="text-4xl">
          Thank you! Your order is being processed.
        </span>
      </div>

      <div className="container mx-auto px-10">
        <span className="text-lg m-8">Order details:</span>
        <div className="grid grid-cols-6 gap-x-32 mx-9 my-4 px-5 text-xl text-slate-500">
          <span className="flex flex-row space-x-11 items-center col-span-4">
            Item
          </span>
          <div className="flex justify-start space-x-20 col-span-1">
            <span>Quantity</span>
          </div>

          <div className="flex justify-start space-x-20 col-span-1">
            <span>Price</span>
          </div>
        </div>
        <hr></hr>

        <div className="h-[17rem] overflow-y-scroll">
          {productList.map((product) => (
            <ItemRow
                key={product.id}
                {...product}
                stage={3}
                itemName={product.name}
                itemCategories={product.categories}
                itemPrice={product.price * selectedItems[product.id].quantity}
                itemQuantity={selectedItems[product.id].quantity}
                itemRating={product.stars}
            />
          ))}
        </div>

        <div className="text-end text-lg">
          <span>Total cost: {formatPrice(totalCost)}</span>
        </div>
        <div className="text-end my-10">
          <Button label="Go to dashboard" onClick={handleDashboard} />
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
