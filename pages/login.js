import Link from 'next/link'
import { Router, useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const router = useRouter();

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/');
    }
  }, [])
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formBody = { email, password };
    console.log(formBody);
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formBody),
    })

    let response = await res.json();
    console.log(response);
    setEmail('');
    setPassword('');
    if (response.success) {
      console.log(response.token);
      localStorage.setItem('token', response.token);
      toast.success('user logged in', {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push('/');
      }, 1500);
    }
  }
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="w-full max-w-md space-y-8">
          <div>
            <img class="mx-auto h-12 w-auto" src="/codeswearcircle.png" alt="Your Company" />
            <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Login in to your account</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
              Or
              <Link href={'/signup'}><span class="font-medium text-pink-600 hover:text-pink-500 ml-2">Sign In</span></Link>
            </p>
          </div>
          <form onSubmit={handleSubmit} class="mt-8 space-y-6" method="POST">
            <input type="hidden" name="remember" value="true" />
            <div class="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email" class="sr-only">Email address</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email" autocomplete="email" required class="px-4 relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Email address" />
              </div>
              <div>
                <label htmlFor="password" class="sr-only">Password</label>
                <input value={password} onChange={(e) => setPassword(e.target.value)} id="password" name="password" type="password" autocomplete="current-password" required class="px-4 relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6" placeholder="Password" />
              </div>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-pink-600 focus:ring-pink-600" />
                <label htmlFor="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
              </div>

              <div class="text-sm">
                <Link href={'/forgotpass'}><p class="font-medium text-pink-600 hover:text-pink-500">Forgot your password?</p></Link>
              </div>
            </div>

            <div>
              <button type="submit" class="group relative flex w-full justify-center rounded-md bg-pink-600 py-2 px-3 text-sm font-semibold text-white hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600">
                <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg class="h-5 w-5 text-pink-500 group-hover:text-pink-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clip-rule="evenodd" />
                  </svg>
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login