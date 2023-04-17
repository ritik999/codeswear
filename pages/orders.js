import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import mongoose from 'mongoose'
import OrderSchema from "../models/Order";
import Link from 'next/link';



const orders = () => {
    const router=useRouter();
    const [order,setOrders]=useState([]);

    useEffect(()=>{
        if(!localStorage.getItem('token')){
            router.push('/');
        }else{
            fetchPostData();
        }
    },[])

    const fetchPostData=async()=>{
        const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({token:localStorage.getItem('token')}),
          })
        
          let response = await res.json();
          console.log(response);
          setOrders(response.orders)
    }
    
    return (
        <div>
            <div className='w-11/12 mx-auto'>
                <h1 className='text-center text-2xl font-bold mt-4 mb-3'>My orders</h1>
                <div class="flex flex-col">
                    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div class="overflow-hidden">
                                <table class="min-w-full text-left text-sm font-light">
                                    <thead class="border-b font-medium dark:border-neutral-500">
                                        <tr>
                                            <th scope="col" class="px-6 py-4">Order ID</th>
                                            <th scope="col" class="px-6 py-4">Email</th>
                                            <th scope="col" class="px-6 py-4">Amount</th>
                                            <th scope="col" class="px-6 py-4">Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((item)=>{
                                            return(
                                         <tr key={item._id}
                                            class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                                            <td class="whitespace-nowrap px-6 py-4 font-medium">{item.orderId}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{item.email}</td>
                                            <td class="whitespace-nowrap px-6 py-4">{item.amount}</td>
                                            <td class="whitespace-nowrap px-6 py-4">
                                                <Link href={`/order?id=${item._id}`}>Details</Link>
                                            </td>
                                        </tr>
                                            )
                                        })}
                                        
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default orders


// export async function getServerSideProps(context) {
//     if (!mongoose.connections[0].readyState) {
//       await mongoose.connect(process.env.MONGO_URI);
//     }
  
//     let orders = await OrderSchema.find();
//     let colorSizeSlug = {}
  
//     return {
//       props: { orders:orders}
//     }
//   }