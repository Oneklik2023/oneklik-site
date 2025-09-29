"use client";
import React from 'react'
import { useState } from "react";

export default function ContactForm() {
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("https://twojadomena.pl/wp-json/contact-form-7/v1/contact-forms/123/feedback", {
      method: "POST",
      body: new FormData(e.target as HTMLFormElement),
    });

    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className=' pt-16 pb-16 w-[90%] md:w-[80%] lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
      <div className='d:p-10 p-5 bg-[#0F224C] rounded-lg'>
        <div>
          <form className='flex flex-col gap-4 text-white' 
            onSubmit={handleSubmit}>
            <input className='grid grid-cols-1 md:grid-cols-1 gap-4 text-white bg-[#6A7282] p-2 rounded-md mt-4 w-full'
            type="text" 
            name="your-name" 
            placeholder="Name" />
            <input className='grid grid-cols-1 md:grid-cols-1 gap-4 text-white bg-[#6A7282] p-2 rounded-md mt-4 w-full'
            type="phone" 
            name="your-phone" 
            placeholder="Phone" />
            <input className='grid grid-cols-1 md:grid-cols-1 gap-4 text-white bg-[#6A7282] p-2 rounded-md mt-4 w-full'
            type="email" 
            name="your-email" 
            placeholder="Email" />
            <textarea className='grid grid-cols-1 md:grid-cols-1 gap-4 text-white bg-[#6A7282] p-2 rounded-md mt-4 w-full'
            rows={4}
            name="your-message" 
            placeholder="Your message" />
          </form>
        </div>
      <button 
        className='bg-[#FC9700] text-white py-2 px-4 rounded-md mt-7 hover:bg-[#e68a00] cursor-pointer transition-all duration-300 ease-in-out'
        type="submit">
        Send Message
      </button>
      {message && <p>{message}</p>}
      </div>
    </div>
  );
}
