'use client'
import React from 'react'
import { IconType } from 'react-icons'

type Props = {
    Icon: IconType;
    name: string;
    description: string;
}
const WhatWeDoCard = ({ Icon, name, description }: Props) => {
  return (
    <div className=' rounded-lg p-6 shadow-md'>
      <div className='flex items-center mb-6 gap-4'>
        <Icon className='w-10 h-10 text-blue-500 mr-2' />
        <h3 className='text-2xl font-semibold text-[#FC9700]'>{name}</h3>
      </div>
      <p className='text-white'>{description}</p>
    </div>
  );
}

export default WhatWeDoCard;