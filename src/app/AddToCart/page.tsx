"use client";
import React, { useEffect, useState } from "react";
import Button from "@/components/Button";
import Stepper from "@/components/Stepper";
import ItemRow from "@/components/ItemRow/ItemRowS1";
import { useRouter } from "next/navigation";
import { useSelectedItems } from "@/app/Contexts/productsContext";

interface Product {
  id: string;
  name: string;
  categories: string[];
  stars: number;
  price: number;
}

const AddToCardPage: React.FC = () => {
  const router = useRouter();

  // accessing the context value, here the context will be empty initially
  const { selectedItems, setSelectedItems } = useSelectedItems();

  const [productList, setProductList] = useState<Product[]>([]);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data: Product[] = await response.json();
        setProductList(data);
      } catch (err: any) {
        console.error("Error fetching products:", err.message);
      }
    };
    fetchProducts();
  }, []);

  const handleCheckboxChange = (productId: string, checked: boolean) => {
    setSelectedItems((prevState) => {
      const updatedSelectedItems = { ...prevState };

      if (checked) {
        const quantity = updatedSelectedItems[productId]?.quantity || 1;
        console.log(productId, quantity);
        updatedSelectedItems[productId] = { quantity, checked: true };
      } else {
        delete updatedSelectedItems[productId];
      }
      return updatedSelectedItems;
    });
  };

  const handleQuantityChange = (productId: string, quantity: number) => {
    setSelectedItems((prevState) => {
      const updatedSelectedItems = { ...prevState };

      if (updatedSelectedItems[productId]?.checked) {
        updatedSelectedItems[productId].quantity = quantity;
      } else {
        if (updatedSelectedItems[productId]?.checked) {
          updatedSelectedItems[productId] = {
            quantity,
            checked: true,
          };
        }
      }
      return updatedSelectedItems;
    });
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/Payment`);
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handlePayment} className="form">
        <div className="container mx-auto px-64 py-5">
          <Stepper activeStep={1} />
        </div>

        <div className="container mx-auto my-5">
          <span className="text-lg">Select items to add them to cart</span>

          <div className="grid grid-cols-3 gap-x-60 my-3 p-2 text-xl text-slate-500">
            <div className="flex flex-row space-x-11 items-center col-span-2">
              <div className="box-border border border-slate-600 rounded-sm w-7 h-7"></div>
              <span>Item</span>
            </div>

            <div className="flex justify-start space-x-20">
              <span>Quantity</span>
              <span>Price</span>
            </div>
          </div>
        </div>
        <hr></hr>

        <div className="h-[26rem] overflow-y-scroll">
          {productList.map((product) => (
            <ItemRow
              key={product.id}
              {...product}
              stage={1}
              itemName={product.name}
              itemCategories={product.categories}
              itemPrice={product.price}
              itemQuantity={1}
              itemRating={product.stars}
              checked={selectedItems[product.id]?.checked || false}
              onCheckboxChange={(checked) =>
                handleCheckboxChange(product.id, checked)
              }
              onQuantityChange={(quantity) =>
                handleQuantityChange(product.id, quantity)
              }
            />
          ))}
        </div>

        <div className="text-end m-5">
          <Button label="Continue to payment" />
        </div>
      </form>
    </div>
  );
};

export default AddToCardPage;
