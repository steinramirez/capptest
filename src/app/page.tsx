"use client"
import React, { useState } from 'react';
import Slider from './components/Slider';
import './styles/globals.css';
import HomeContent from './components/HomeContent'
import ContactFooter from './components/ContactFooter'

export default function Home() {

  const gradientColor = 'h-[40vh] z-10 w-full bg-gradient-to-t from-[#a9765c]'

  return (
    <div className='flex flex-col  max-h-full h-screen overflow-hidden'>
      <div className={gradientColor}>
      </div>
      <Slider />
      <HomeContent /> 
      <ContactFooter />
    </div>
  );
}