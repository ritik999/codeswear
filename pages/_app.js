import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'
import LoadingBar from 'react-top-loading-bar'

export default function App({ Component, pageProps }) {
  const[cart,setCart]=useState({});
  const[subTotal,setSubTotal]=useState(0);
  const[user,setUser]=useState({value:null});
  const [key,setKey]=useState(Math.random());
  const [progress, setProgress] = useState(0)
  const router=useRouter();

  useEffect(()=>{
    router.events.on('routeChangeStart', ()=>setProgress(40));
    router.events.on('routeChangeComplete', ()=>setProgress(100));
    try {
      if(localStorage.getItem('cart')){
        setCart(JSON.parse(localStorage.getItem('cart')));
        saveCart(JSON.parse(localStorage.getItem('cart')));
      } 
    } catch (error) {
      console.log(error);
      localStorage.clear();
    }

    const token=localStorage.getItem('token');
    if(token){
      setUser({value:token})
    }
  },[router.query])

  const saveCart=(myCart)=>{
    localStorage.setItem('cart',JSON.stringify(myCart));
    let subt=0;
    let keys=Object.keys(myCart);
    for(let i=0;i<keys.length;i++){
      subt+=myCart[keys[i]].qty * myCart[keys[i]].price;
    }
    setSubTotal(subt);
  }

  const addToCart=(itemCode, qty, price, name, size, variant)=>{
    let newCart=cart;
    if(itemCode in cart){
      newCart[itemCode].qty=cart[itemCode].qty+1;
    }else{
      newCart[itemCode]={qty,price,name,size,variant};
    }
    setCart(newCart);
    saveCart(newCart);
  }

  const buyNow=(itemCode, qty, price, name, size, variant)=>{
    let newCart={} 
    newCart[itemCode]={qty:1,price,name,size,variant}
    setCart(newCart);
    saveCart(newCart);
    router.push('/checkout');
  }
  
  const removeFromCart=(itemCode, qty, price, name, size, variant)=>{
    console.log(itemCode);
    let newCart=cart;
    if(itemCode in cart){
      newCart[itemCode]['qty']=cart[itemCode].qty-1;
    }
    if(newCart[itemCode]['qty']<=0){
      delete newCart[itemCode];
    }
    setCart(newCart);
    saveCart(newCart);
  }
  
  const logout=()=>{
    localStorage.removeItem('token');
    // setKey(Math.random());
    setUser({value:null})
    router.push('/')
  }

  const clearCart=()=>{
    setCart({});
    saveCart({});
  }
  return (
  <>
    <LoadingBar
        color='#ff2d55'
        progress={progress}
        waitingTime={500}
        onLoaderFinished={() => setProgress(0)}
      />
  <Navbar logout={logout}  user={user} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} />
  <Component buyNow={buyNow} cart={cart} addToCart={addToCart} removeFromCart={removeFromCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
  <Footer />
  </>
  )
}
