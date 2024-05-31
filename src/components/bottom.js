"use client"
import React from 'react'
import Card from '@/components/card'
import { motion } from 'framer-motion'

const bottom = () => {
  return (
    <motion.div className='w-screen h-[500px]'>
      <Card />
    </motion.div>
  )
}

export default bottom
