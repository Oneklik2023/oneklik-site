'use client';
import React from 'react';
import {
  BiEnvelope,
  BiPhoneIncoming,
  BiMap,
  BiLogoFacebook,
  BiLogoInstagram,
} from 'react-icons/bi';
import ContactForm from '@/components/ContactForm/ContactForm';

const Contact = () => {
  return (
    <div className='pt-16 pb-16'>
      <div className='w-[90%] md:w-[80%] lg:w-[70%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center'>
        {/* Left Side - Text content */}
        <div>
          <h1 className='text-2xl md:text-4xl xl:text-5xl font-bold text-[#FC9700]'>
            Consultation
          </h1>
          <p className='text-gray-400 mt-4 text-justify'>
            We invite you to a free consulting session where we will take a thorough look at your current business strategy and the ambitions you plan to achieve. Based on an initial assessment of your current business initiatives, we will propose tailored solutions and tactics that will support your financial capabilities and long-term company development. It&apos;s important to know that participating in this consultation is completely non-binding. If you decide you&apos;re not ready to continue working with us at this time, we&apos;ll be happy to offer you helpful advice and support.
          </p>

          {/* Contact info */}
          <div className='mt-7'>
            <div className='flex items-center space-x-3 mb-4'>
              <BiEnvelope className='w-9 h-9 text-gray-500' />
              <a
                className='text-xl text-[#FC9700] hover:text-white'
                href='mailto:biuro@oneklik.pl'
              >
                biuro@oneklik.pl
              </a>
            </div>
            <div className='flex items-center space-x-3 mb-4'>
              <BiPhoneIncoming className='w-9 h-9 text-gray-500' />
              <a
                className='text-xl text-[#FC9700] hover:text-white'
                href='tel:+48724081757'
              >
                +48 724 081 757
              </a>
            </div>
            <div className='flex items-center space-x-3 mb-4'>
              <BiMap className='w-9 h-9 text-gray-500' />
              <p className='text-xl text-[#FC9700]'>Białystok, Poland</p>
            </div>
          </div>

          {/* Social icons */}
          <div className='flex items-center space-x-2 mt-8'>
            <a
              href='https://www.facebook.com/oneklik22'
              target='_blank'
              rel='noopener noreferrer'
            >
              <BiLogoFacebook className='w-8 h-8 hover:text-[#FC9700] bg-gray-500 hover:bg-white p-1 rounded-full transition-all duration-300 ease-in-out' />
            </a>
            <a
              href='https://www.instagram.com/oneklik.pl/'
              target='_blank'
              rel='noopener noreferrer'
            >
              <BiLogoInstagram className='w-8 h-8 hover:text-[#FC9700] bg-gray-500 hover:bg-white p-1 rounded-full transition-all duration-300 ease-in-out' />
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact;
