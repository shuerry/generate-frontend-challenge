'use client'
import React, { useEffect, useState } from 'react';
import Button from "@/components/Button";
import Stepper from "@/components/Stepper";
import TextBox from "@/components/Input";
import ItemRow from "@/components/ItemRow/ItemRowS2";
import { useRouter } from 'next/navigation';
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
  const { selectedItems } = useSelectedItems();
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProductDetails = async (productId: string) => {
    try {
        const response = await fetch(`/api/products/${productId}`, {
          method: 'GET',
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch product: ${response.statusText}`);
        }
        return await response.json();

      } catch (err: any) {
        console.error('Error fetching products:', err.message);
      }
  };

  const fetchProducts = async () => {
    try {
      // Extract product IDs from selectedItems and make sure to get unique ones
      const productDetailsPromises = Object.keys(selectedItems).map((productId) => {
        console.log(productId);
        return fetchProductDetails(productId);
      });

      // Wait for all product details to be fetched concurrently
      const data = await Promise.all(productDetailsPromises);
      setProductList(data);
    } catch (err: any) {
      console.error('Error fetching product details:', err.message);
    }
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedItems]);

  const handleComplete = async (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/Complete`);
  };

  const totalCost = productList.reduce((total, product) => {
    const selectedItem = selectedItems[product.id];
    return total + (selectedItem?.quantity || 1) * product.price;
  }, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto px-64 py-5">
        <Stepper activeStep={2} />
      </div>

      <div className='container mx-auto px-10'>
        <div className="grid grid-cols-6 gap-x-28 mx-9 my-4 px-5 text-lg text-slate-500">
            <span className="flex flex-row space-x-11 items-center col-span-4">Item</span>
            <div className="flex justify-start space-x-20 col-span-1">
              <span>Quantity</span>
            </div>

            <div className="flex justify-start space-x-20 col-span-1">
              <span>Price</span>
            </div>
        </div>
        <hr></hr>

          <div className='h-52 overflow-y-scroll'>
            {productList.map((product) => (
              <ItemRow
                key={product.id}
                {...product}
                stage={2}
                itemName={product.name}
                itemCategories={product.categories}
                itemPrice={product.price * selectedItems[product.id].quantity}
                itemQuantity={selectedItems[product.id].quantity}
                itemRating={product.stars}
              />
            ))}
        </div>

        <div className='text-end mx-10 text-lg'>
          <span>Total cost: {formatPrice(totalCost)}</span>
        </div>
      </div>

      
      <form onSubmit={handleComplete} className="form">
        <div className='px-12 m-6 flex flex-col gap-4'>
            <span className='text-lg'>Enter payment details</span>
            <TextBox label='Cardholder name' placeHolder='First and last name' isCompleted={false}/>
            <TextBox label='Card information' placeHolder='Card number' isCompleted={false}/>
            <div className='grid grid-cols-2 gap-4'>
                <TextBox placeHolder='Expiration date MM/YY' isCompleted={false}/>
                <TextBox placeHolder='CVV' isCompleted={false}/>
            </div>
            <div className='text-end'>
                <Button label="Complete Order"/>
            </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentPage;