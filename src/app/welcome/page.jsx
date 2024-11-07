"use client"

import Image from "next/image";
import React from 'react'
import Navbar from '../components/Navbar'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function WelcomPage() {

  const { data: session } = useSession();
  if (!session) redirect("/login");
  console.log(session)

  return (
    <main>
      <Navbar session={session} />
      <div className="flex-grow p-10 ">
        <div className="max-w-md p-6 mx-auto bg-gray-100 rounded-lg shadow-md">
          <h3 className="mb-6 text-4xl font-semibold text-center text-gray-800">ข้อมูลพื้นฐาน</h3>
          <div className="space-y-4 text-center">
            <p className="text-xl text-gray-600"><span className="font-semibold">ชื่อ:</span> {session?.user?.name} {session?.user?.lname}</p>
            <p className="text-xl text-gray-600">
              <span className="font-semibold">วันเกิด:</span> {session?.user?.date}/{session?.user?.month}/{session?.user?.year}
            </p>
            <p className="text-xl text-gray-600"><span className="font-semibold">เพศ:</span> {session?.user?.gender}</p>
            <p className="text-xl text-gray-600"><span className="font-semibold">อีเมล:</span> {session?.user?.email}</p>
          </div>
        </div>
      </div>
    </main>

  );
}
