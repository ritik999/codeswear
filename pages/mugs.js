import Link from 'next/link'
import React from 'react'

const mugs = () => {
  return (
    <div>
       <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
              <Link href={'/product/wear-the-code'}>
                <img alt="ecommerce" className="m-auto h-[40vh] block" src="https://m.media-amazon.com/images/I/31Kxvwn2qSL._AC_UL480_QL65_.jpg" />
                <div className="mt-4 px-10 md:text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-bold">Wear The Code</h2>
                  <p className="mt-1">₹499.00</p>
                  <p className='mt-1'>S, M, L, XL, XXL, L</p>
                </div>
              </Link>
            </div>
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
              <Link href={'/product/wear-the-code'}>
                <img alt="ecommerce" className="m-auto h-[40vh] block" src="https://m.media-amazon.com/images/I/31Kxvwn2qSL._AC_UL480_QL65_.jpg" />
                <div className="mt-4 px-10 md:text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-bold">Wear The Code</h2>
                  <p className="mt-1">₹499.00</p>
                  <p className='mt-1'>S, M, L, XL, XXL, L</p>
                </div>
              </Link>
            </div>
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
              <Link href={'/product/wear-the-code'}>
                <img alt="ecommerce" className="m-auto h-[40vh] block" src="https://m.media-amazon.com/images/I/31Kxvwn2qSL._AC_UL480_QL65_.jpg" />
                <div className="mt-4 px-10 md:text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-bold">Wear The Code</h2>
                  <p className="mt-1">₹499.00</p>
                  <p className='mt-1'>S, M, L, XL, XXL, L</p>
                </div>
              </Link>
            </div>
            <div className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-md m-5">
              <Link href={'/product/wear-the-code'}>
                <img alt="ecommerce" className="m-auto h-[40vh] block" src="https://m.media-amazon.com/images/I/31Kxvwn2qSL._AC_UL480_QL65_.jpg" />
                <div className="mt-4 px-10 md:text-center">
                  <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">T-Shirts</h3>
                  <h2 className="text-gray-900 title-font text-lg font-bold">Wear The Code</h2>
                  <p className="mt-1">₹499.00</p>
                  <p className='mt-1'>S, M, L, XL, XXL, L</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default mugs