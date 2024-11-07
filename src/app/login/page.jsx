"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.replace('welcome');
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }

      router.replace("welcome");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center w-full h-screen bg-gray-100">
        <div className="flex w-3/4 max-w-4xl p-6 bg-white rounded-lg shadow-md">
          <div className="flex flex-col items-center justify-center w-1/2 pr-8">
            <h3 className="mb-4 text-2xl font-semibold">ลงชื่อเข้าใช้</h3>
          </div>
          <div className="w-1/2 p-6">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {error && (
                <div className="px-3 py-1 mt-2 text-sm text-white bg-red-500 rounded-md w-fit">
                  {error}
                </div>
              )}
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="อีเมล"
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="รหัสผ่าน"
                required
                className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="p-2 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                ลงชื่อเข้าใช้
              </button>
              <div className="mt-4 text-center">
                <Link className="text-blue-500 hover:underline" href="/register">
                  สร้างบัญชี
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LoginPage;
