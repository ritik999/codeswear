import { useRouter } from 'next/router'
import React from 'react'
import mongoose from 'mongoose';
import OrderSchema from '../models/Order';

const order = ({ orders }) => {
  const router = useRouter();
  // console.log(orders);
  const product = orders.products;
  // console.log(product);
  return (
    <div>
      <section class="text-gray-600 body-font overflow-hidden">
        <div class="container px-5 py-24 mx-auto">
          <div class="lg:w-4/5 mx-auto flex flex-wrap">
            <img className='h-1/2' alt="ecommerce" class="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
            <div class="lg:w-1/2 w-full lg:pl-10 mt-5 md:mt-0 lg:py-6 mb-6 lg:mb-0">
              <h2 class="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
              <h1 class="text-gray-900 text-2xl title-font font-medium">Order Id: {orders.orderId}</h1>
              <p class="leading-relaxed mb-4">Your order has been successfully placed. Your Payment Status is: <b>{orders.status}</b></p>
              <div class="flex mb-4">
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Description</a>
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Quantity</a>
                <a class="flex-grow border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
              </div>

              {Object.keys(product).map((key) => {
                return (
                  <div key={key} class="flex border-t border-gray-200 py-2">
                    <span class="text-gray-500">{product[key].name}({product[key].size}/{product[key].variant})</span>
                    <span class="m-auto text-gray-900">{product[key].qty}</span>
                    <span class="m-auto text-gray-900">{product[key].price*product[key].qty}</span>
                  </div>
                )
              })}
              
              <div class="flex flex-col mt-3">
                <span class="title-font font-medium text-xl text-gray-900">SubTotal: {orders.amount}</span>
                <div className='mt-2'>
                  <button class="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">Track Order</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let orders = await OrderSchema.findById(context.query.id);
  // let colorSizeSlug = {}

  return {
    props: { orders: JSON.parse(JSON.stringify(orders)) }
  }
}

export default order