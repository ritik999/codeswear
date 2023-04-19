import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';
import { MdAccountCircle } from 'react-icons/md';

const Navbar = ({ logout, user, cart, addToCart, removeFromCart, clearCart, subTotal }) => {
    const ref = useRef();
    const [dropdown, setDropdown] = useState(false);
    const [sideBar, setSideBar] = useState(true);
    const router = useRouter();

    const toggleCart = () => {
        // if (ref.current.classList.contains('translate-x-full')) {
        //     ref.current.classList.remove('translate-x-full');
        //     ref.current.classList.add('translate-x-0');
        // }
        // else if (!ref.current.classList.contains('translate-x-full')) {
        //     ref.current.classList.remove('translate-x-0');
        //     ref.current.classList.add('translate-x-full');
        // }
        setSideBar(!sideBar);
    }

    useEffect(() => {
        Object.keys(cart).length !== 0 && setSideBar(true);
        if (router.pathname == '/checkout' || '/order' || '/orders' || '/') {
            setSideBar(false);
        }
    }, [])
    return (
        <>
            <div>
                {dropdown && <div onMouseOver={() => setDropdown(true)} onMouseLeave={() => setDropdown(false)} className='absolute top-10 right-8 bg-white shadow-md py-4 px-4 rounded-md w-32 z-30'>
                    <ul className='cursor-pointer'>
                        <Link href={'/myaccount'}><li className='hover:text-pink-700 text-sm font-bold'>My Accounts</li></Link>
                        <Link href={'/orders'}><li className='hover:text-pink-700 text-sm font-bold'>Orders</li></Link>
                        <li onClick={logout} className='hover:text-pink-700 text-sm font-bold'>Logout</li>
                    </ul>
                </div>}
            </div>
            <div className={`flex flex-col justify-center items-center md:flex-row md:justify-start py-2 shadow-md sticky top-0 z-10 bg-white ${!sideBar && 'overflow-hidden'}`}>
                <div className='logo mr-auto md:mx-5'>
                    <Image width={200} height={40} src='/logo.webp' />
                </div>
                <div>
                    <ul className='flex space-x-6 font-bold md:text-md'>
                        <Link href={'/tshirts'}><li>Tshirts</li></Link>
                        <Link href={'/hoodies'}><li>Hoodies</li></Link>
                        <Link href={'/stickers'}><li>Stickers</li></Link>
                        <Link href={'/mugs'}><li>Mugs</li></Link>
                    </ul>
                </div>
                <div className='cart absolute right-0 top-4 mx-5 flex items-center cursor-pointer'>
                    <div onMouseOver={() => setDropdown(true)}>

                        {user.value && <MdAccountCircle className="text-xl md:text-3xl mx-2" />}
                    </div>
                    {!user.value && <Link href={'/login'}>
                        <button className='bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-3'>Login</button>
                    </Link>}
                    {user.value && <button onClick={toggleCart}><AiOutlineShoppingCart className='text-xl md:text-3xl cursor-pointer' /></button>}
                </div>

                <div ref={ref} className={`w-72 h-[100vh] sideCart absolute z-40 top-0 bg-pink-100 p-10 transition-all ${sideBar ? 'right-0' : '-right-96'}`}>
                    <h1 className='font-bold text-xl text-center'>Shopping Cart</h1>
                    <span onClick={toggleCart} className='absolute top-5 right-5 text-2xl text-pink-500 cursor-pointer'><AiFillCloseCircle /></span>
                    <ol className='list-decimal font-semibold'>
                        {Object.keys(cart).length == 0 && <div className='my-4 font-semibold'>Your cart is Empty!</div>}
                        {Object.keys(cart).map((k) => {
                            return (
                                <>
                                    <li>
                                        <div className='flex my-3'>
                                            <div className='w-2/3 font-semibold'>{cart[k].name}({cart[k].size}/{cart[k].variant})</div>
                                            <div className='w-1/3 flex justify-center items-center font-semibold text-lg'><AiFillMinusCircle onClick={() => removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-pink-500' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-pink-500' /></div>
                                        </div>
                                    </li>
                                </>
                            )
                        })}
                    </ol>
                    <div className='flex mt-5'>
                        <Link href={'/checkout'}><button disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex mx-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md"><BsFillBagCheckFill className='m-1' />Checkout</button></Link>
                        <button onClick={clearCart} disabled={Object.keys(cart).length === 0} className="disabled:bg-pink-300 flex mx-auto text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md">Clear Cart</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar