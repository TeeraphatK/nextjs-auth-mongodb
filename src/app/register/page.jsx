"use client"

import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

function RegisterPage() {
  const [step, setStep] = useState(1);  // ควบคุมขั้นตอน
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [date, setDate] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const { data: session } = useSession();
  if (session) redirect('/welcome');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match!");
      return;
    }

    try {
      const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
      });

      const { user } = await resCheckUser.json();

      if (user) {
        setError("User already exists.");
        return;
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, lname, date, month, year, gender, email, password
        })
      });

      if (res.ok) {
        setError("");
        setSuccess("User registration successfully.");
      } else {
        console.log("User registration failed.")
      }

    } catch (error) {
      console.log("Error during registration: ", error)
    }
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePrevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <>
      <Navbar />
    <div className="flex items-center justify-center w-full h-screen bg-gray-100">
      <div className="flex w-3/4 max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center justify-center w-1/2 pr-8">
          <h3 className="mb-4 text-2xl font-semibold">สร้างบัญชี</h3>
        </div>
        <div className="w-1/2 p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {error && (
              <div className="px-3 py-1 mt-2 text-sm text-white bg-red-500 rounded-md w-fit">
                {error}
              </div>
            )}
            {success && (
              <div className="px-3 py-1 mt-2 text-sm text-white bg-green-500 rounded-md w-fit">
                {success}
              </div>
            )}

            {/* Step 1: ข้อมูลส่วนตัว */}
            {step === 1 && (
              <>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="ชื่อ"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  value={lname}
                  onChange={(e) => setLname(e.target.value)}
                  type="text"
                  placeholder="นามสกุล"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </>
            )}

             {/* Step 2: วัน, เดือน, ปี, เพศ  */}
            {step === 2 && (
              <>
                <input
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  type="text"
                  placeholder="วัน"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">เดือน</option>
                  <option value="January">มกราคม</option>
                  <option value="February">กุมภาพันธ์</option>
                  <option value="3">มีนาคม</option>
                  <option value="4">เมษายน</option>
                  <option value="5">พฤษภาคม</option>
                  <option value="6">มิถุนายน</option>
                  <option value="7">กรกฎาคม</option>
                  <option value="8">สิงหาคม</option>
                  <option value="9">กันยายน</option>
                  <option value="10">ตุลาคม</option>
                  <option value="11">พฤศจิกายน</option>
                  <option value="12">ธันวาคม</option>
                </select>
                <input
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  type="text"
                  placeholder="ปี"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
                  <option value="">เพศ</option>
                  <option value="male">ชาย</option>
                  <option value="female">หญิง</option>
                </select>
              </>
            )}

            {/* Step 3: อีเมล, รหัสผ่าน, ยืนยันรหัสผ่าน */}
            {step === 3 && (
              <>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="อีเมล"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="รหัสผ่าน"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="ยืนยันรหัสผ่าน"
                  className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </>
            )}

            <div className="flex justify-between mt-4">
              {step > 1 && (
                <button type="button" onClick={handlePrevStep} className="px-4 py-2 text-gray-800 bg-gray-300 rounded-md">
                  ย้อนกลับ
                </button>
              )}
              {step === 3 ? (
                <button type="submit" className="px-6 py-2 text-white bg-blue-500 rounded-md">ลงทะเบียน</button>
              ) : (
                <button type="button" onClick={handleNextStep} className="px-6 py-2 text-white bg-blue-500 rounded-md">ถัดไป</button>
              )}
            </div>
          </form>
          <hr className='my-3' />
          <p>Go to <Link href="/login" className='text-blue-500 hover:underline'>Login</Link> Page</p>
        </div>
      </div>
    </div>
    </>
  );
}

export default RegisterPage;
