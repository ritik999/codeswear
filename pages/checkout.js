import Link from 'next/link';
import Script from 'next/script';
import React, { useState } from 'react'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiFillPlusCircle, AiFillMinusCircle } from 'react-icons/ai';
import { BsFillBagCheckFill } from 'react-icons/bs';

const checkout = ({ cart, addToCart, removeFromCart, clearCart, subTotal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [disabled, setDisabled] = useState(true);

  // if(name.length>2 && email.length>2 && phone.length>2 && address.length>2 && city.length>2 && state.length>2 && pincode.length>2){
  //   setDisabled(false);
  // }

  const handleChange = async (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value);
    }
    else if (e.target.name == 'email') {
      setEmail(e.target.value);
    }
    else if (e.target.name == 'phone') {
      setPhone(e.target.value);
    }
    else if (e.target.name == 'address') {
      setAddress(e.target.value);
    }
    else if (e.target.name == 'city') {
      setCity(e.target.value);
    }
    else if (e.target.name == 'state') {
      setState(e.target.value);
    }
    else if (e.target.name == 'pincode') {
      setPincode(e.target.value);
      if (e.target.value.length == 6) {
        let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
        let pinJson = await pins.json()
        if (Object.keys(pinJson).includes(e.target.value)) {
          setCity(pinJson[e.target.value][0])
          setState(pinJson[e.target.value][1])
        }else{
          setCity('')
          setState('')
        }
      } else {
        setCity('')
        setState('')
      }
    }

    setTimeout(() => {
      if (name.length > 2 && email.length > 2 && phone.length > 2 && address.length > 2 && pincode.length > 4) {
        setDisabled(false);
      } else {
        setDisabled(true)
      }
    }, 100)
  }

  const pay = async () => {
    const oid=Math.floor(Math.random()*Date.now());
    const data={cart,subTotal,oid,email,name,address,pincode,phone};
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    let response = await res.json();

    console.log(response['order']);

    let options = {
      "key": process.env.NEXT_PUBLIC_RAZORPAY_API_KEY, // Enter the Key ID generated from the Dashboard
      "amount": response['order']['amount'], // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      "currency": "INR",
      "name": "Codeswear",
      "description": "payment for being coder",
      "image": "https://example.com/your_logo",
      "order_id": response['order']['id'], //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      "callback_url": `${process.env.NEXT_PUBLIC_HOST}/api/posttransaction`,
      "prefill": {
        "name": "Gaurav Kumar",
        "email": "gaurav.kumar@example.com",
        "contact": "9000090000"
      },
      "notes": {
        "address": "Razorpay Corporate Office"
      },
      "theme": {
        "color": "#ec4899"
      }
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  }


  return (
    <div className='container m-auto md:px-36 px-10'>
      <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>
      <h1 className='font-bold text-3xl my-8 text-center'>Checkout</h1>
      <h2 className='text-xl font-bold'>1. Delivery Details</h2>
      <div className='mx-auto md:flex my-2'>
        <div className='md:w-1/2 mr-2'>
          <div class="flex-grow w-full">
            <label for="name" class="leading-7 text-sm text-gray-600">Name</label>
            <input onChange={handleChange} value={name} type="text" id="name" name="name" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='md:w-1/2'>
          <div class="flex-grow w-full">
            <label for="email" class="leading-7 text-sm text-gray-600">Email</label>
            <input onChange={handleChange} value={email} type="email" id="email" name="email" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <div class="flex-grow w-full">
        <label for="address" class="leading-7 text-sm text-gray-600">Address</label>
        <textarea onChange={handleChange} value={address} cols='28' rows='3' id="address" name="address" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
      </div>

      <div className='mx-auto md:flex my-2'>
        <div className='md:w-1/2 mr-2'>
          <div class="flex-grow w-full">
            <label for="phone" class="leading-7 text-sm text-gray-600">Phone</label>
            <input onChange={handleChange} value={phone} type="phone" id="phone" name="phone" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='md:w-1/2'>
          <div class="flex-grow w-full">
            <label for="pincode" class="leading-7 text-sm text-gray-600">PinCode</label>
            <input onChange={handleChange} value={pincode} type="number" id="pincode" name="pincode" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <div className='mx-auto md:flex my-2'>
        <div className='md:w-1/2 mr-2'>
          <div class="flex-grow w-full">
            <label for="state" class="leading-7 text-sm text-gray-600">State</label>
            <input onChange={handleChange} value={state} readOnly type="text" id="state" name="state" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
        <div className='md:w-1/2'>
          <div class="flex-grow w-full">
            <label for="city" class="leading-7 text-sm text-gray-600">City</label>
            <input onChange={handleChange} readOnly value={city} type="text" id="city" name="city" class="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:bg-transparent focus:ring-2 focus:ring-pink-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
          </div>
        </div>
      </div>

      <h2 className='text-xl font-bold mt-8'>2. Review Cart Items</h2>

      <div className='sideCart bg-pink-100 md:px-10 py-5 md:m-4'>
        <ol className='list-decimal font-semibold'>
          {Object.keys(cart).map((k) => {
            return (
              <>
                <li>
                  <div className='flex justify-around md:justify-start md:m-3'>
                    <div className='font-semibold'>{cart[k].name} ({cart[k].variant}/{cart[k].size})</div>
                    <div className='md:w-1/3 flex justify-center items-center font-semibold text-lg'><AiFillMinusCircle onClick={() => removeFromCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-pink-500' /><span className='mx-2'>{cart[k].qty}</span><AiFillPlusCircle onClick={() => addToCart(k, cart[k].qty, cart[k].price, cart[k].name, cart[k].size, cart[k].variant)} className='cursor-pointer text-pink-500' /></div>
                  </div>
                </li>
              </>
            )
          })}
        </ol>
        <span className='font-bold m-5'>Subtotal: {subTotal}</span>
      </div>
      <div className='mt-4'>
        <Link href={'/checkout'}><button onClick={pay} disabled={disabled} className="disabled:bg-pink-300 flex md:ml-6 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md">Pay ₹{subTotal}</button></Link>
      </div>
    </div>
  )
}

export default checkout