"use client"

import React from 'react'
import { motion } from 'framer-motion'

const InDevelopment = () => {
  return (
    <div style={styles.container}>
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={styles.heading}
      >
        Coming Soon
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1.5, ease: "easeOut" }}
        style={styles.message}
      >
        This page is under construction. Check back soon!
      </motion.p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#333',
    textAlign: 'center',
    padding: '0 20px',
  },
  heading: {
    fontSize: '3rem',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#2a9d8f',
  },
  message: {
    fontSize: '1.5rem',
    lineHeight: 1.5,
    maxWidth: '600px',
    color: '#264653',
    fontWeight: 300,
  },
}

export default InDevelopment
