import Link from 'next/link'
import React from 'react'
import mongoose from 'mongoose'
import ProductSchema from "../models/Product";


const stickers = ({ products }) => {
  console.log(products);
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {Object.keys(products).map((item) => {
              return (
                <>
                  <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
                    <Link href={`/product/${products[item].slug}`}>
                      <img alt="ecommerce" className="m-auto h-[40vh] block" src={products[item].img} />
                      <div className="mt-4 px-10 md:text-center">
                        <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">Sticker</h3>
                        <h2 className="text-gray-900 title-font text-lg font-bold">{products[item].title}</h2>
                        <p className="mt-1">₹{products[item].price}</p>
                        <div className='mt-1'>
                          {products[item].size.includes('S') && <span className='border border-gray-300 px-1 mx-1'>S</span>}
                          {products[item].size.includes('M') && <span className='border border-gray-300 px-1 mx-1'>M</span>}
                          {products[item].size.includes('L') && <span className='border border-gray-300 px-1 mx-1'>L</span>}
                          {products[item].size.includes('XL') && <span className='border border-gray-300 px-1 mx-1'>XL</span>}
                          {products[item].size.includes('XXL') && <span className='border border-gray-300 px-1 mx-1'>XXL</span>}
                        </div>
                        <div className='mt-1'>
                          {products[item].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                          {products[item].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                          {products[item].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                          {products[item].color.includes('yellow') && <button className="border-2 border-gray-300 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                          {products[item].color.includes('purple') && <button className="border-2 border-gray-300 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none"></button>}
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              )
            })}
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

  let products = await ProductSchema.find({ category: 'stickers' });
  let stickers = {};
  for (let item of products) {
    if (item.title in stickers) {
      if (!stickers[item.title].color.includes(item.color) && item.availableQty > 0) {
        stickers[item.title].color.push(item.color);
      }
      if (!stickers[item.title].size.includes(item.size) && item.availableQty > 0) {
        stickers[item.title].size.push(item.size);
      }
    } else {
      stickers[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        stickers[item.title].size = [item.size];
        stickers[item.title].color = [item.color];
      }
    }
  }
  return {
    props: { products: JSON.parse(JSON.stringify(stickers)) }
  }
}


export default stickers