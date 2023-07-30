"use client"
import React, { useState } from 'react';
import Slider from './components/Slider';
import './styles/globals.css';
import HomeContent from './components/HomeContent'
import ContactFooter from './components/ContactFooter'

export default function Home() {

 
  return (
    <div className='flex-col max-h-full h-screen overflow-hidden'>
      <Slider />
      <HomeContent /> 
      <ContactFooter />
    </div>
  );
}