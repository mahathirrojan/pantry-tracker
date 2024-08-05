'use client'
import React, { useState, useEffect } from 'react'
import { Box, Typography, Button, CircularProgress, Paper } from '@mui/material'
import { firestore } from '@/firebase'
import { collection, getDocs, query } from 'firebase/firestore'
import Sidebar from '../components/SideBar'

export default function Recipes() {
  const [inventory, setInventory] = useState([])
  const [recipe, setRecipe] = useState('')
  const [loading, setLoading] = useState(false)

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList.map(item => item.name))
  }

  const generateRecipe = async () => {
    setLoading(true)
    console.log('Sending request to generate recipe...') // Log to check if this runs
  
    try {
      const response = await fetch('/api/generateRecipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: inventory }),
      })
  
      console.log('Response received:', response) // Log the response
  
      const data = await response.json()
      console.log('Data:', data) // Log the data
  
      setRecipe(data.recipe)
    } catch (error) {
      console.error('Error generating recipe:', error)
    } finally {
      setLoading(false)
    }
  }
  

  useEffect(() => {
    updateInventory()
  }, [])

  return (
    <Box display="flex">
      <Sidebar />
      <Box
        width="calc(100vw - 250px)"
        height="100vh"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        gap={4}
        sx={{
          background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
          padding: '20px',
        }}
      >
        <Typography variant="h2" color="white">
          AI-Generated Recipe
        </Typography>

        <Button
          variant="contained"
          onClick={generateRecipe}
          sx={{
            backgroundColor: '#3b82f6',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            '&:hover': {
              backgroundColor: '#2563eb',
            },
          }}
        >
          Generate Recipe
        </Button>

        {loading ? (
          <CircularProgress />
        ) : (
          <Paper
            elevation={3}
            sx={{
              padding: '20px',
              maxWidth: '600px',
              backgroundColor: 'white',
              borderRadius: '8px',
            }}
          >
            <Typography variant="h5" color="#333">
              {recipe ? recipe : 'Click the button to generate a recipe!'}
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  )
}
