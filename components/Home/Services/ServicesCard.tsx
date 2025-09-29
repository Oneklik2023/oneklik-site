import React from 'react'
import Image from 'next/image'

type Props = {
    icon: React.ReactNode;
    name: string;
    description: string;
}

const ServiceCard = ({icon, name, description}: Props) => {
  return <div>
    {typeof icon === 'string' ? (
      <Image src={icon} alt='img' width={60} height={60} />
    ) : (
      icon
    )}
    <h1 className='mt-6 text-xl md:text-2xl font-bold text-gray-200'>{name}</h1>
    <p className='mt-6 text-gray-400'>{description}</p>
  </div>
}

export default ServiceCard