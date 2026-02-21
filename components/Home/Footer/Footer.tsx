import React from 'react'

const Footer = () => {
  return  <div className='bg-blue-900/20 p-8 flex items-center justify-center gap-10 flex-col md:flex-row'>
    <h1 className='text-lg text-[#FC9700] text-center'>
    <a href="#home" target="_self" rel="noopener noreferrer">zacznijmy</a> <span className='text-white'>współpracę</span>
    </h1> 
    <h1 className='text-lg text-[#FC9700] text-center'>
      <a href="#home" target="_self" rel="noopener noreferrer">oneklik</a> <span className='text-white'>niech cię zobaczą</span>
    </h1>
    <h1 className='text-lg text-[#FC9700] text-center'>
      <a href="#home" target="_self" rel="noopener noreferrer">polityka</a> <span className='text-white'>prywatności</span>
    </h1>
  </div>
}

export default Footer