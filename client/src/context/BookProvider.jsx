import React from 'react'
import { createContext, useState } from 'react'

export const BookContext = createContext()

export const BookProvider = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  
  return (
    <BookContext.Provider value={{ selectedCategory, setSelectedCategory, categories, setCategories, searchQuery, setSearchQuery }}>
      {children}
    </BookContext.Provider>
  )
}
