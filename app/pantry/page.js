'use client'
import React, { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Typography, Modal, Stack, TextField, Button, Paper } from '@mui/material'
import { collection, getDocs, query, deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore'
import Sidebar from '../components/SideBar'

export default function Pantry() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')

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
    setInventory(inventoryList)
  }

  const removeItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }
    await updateInventory()
  }

  const addItem = async (item) => {
    const docRef = doc(collection(firestore, 'inventory'), item)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

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
        <Modal open={open} onClose={handleClose}>
          <Box
            position="absolute"
            top="50%"
            left="50%"
            width={400}
            bgcolor="white"
            boxShadow={24}
            p={4}
            display="flex"
            flexDirection="column"
            gap={3}
            sx={{ transform: 'translate(-50%,-50%)', borderRadius: '8px' }}
          >
            <Typography variant="h6" color="#333">
              Add Item
            </Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
              />
              <Button
                variant="contained"
                onClick={() => {
                  addItem(itemName)
                  setItemName('')
                  handleClose()
                }}
                sx={{
                  backgroundColor: '#FF7E5F',
                  color: 'white',
                  '&:hover': {
                    backgroundColor: '#FF6B6B'
                  }
                }}
              >
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>

        <Button
          variant="contained"
          onClick={handleOpen}
          sx={{
            backgroundColor: '#FF7E5F',
            color: 'white',
            padding: '10px 20px',
            borderRadius: '8px',
            boxShadow: '2px 2px 10px rgba(0, 0, 0, 0.3)',
            '&:hover': {
              backgroundColor: '#FF6B6B'
            }
          }}
        >
          Add New Item
        </Button>

        <Box
          component={Paper}
          elevation={2}
          sx={{
            width: '800px',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 20px',
              backgroundColor: '#f7f9fc',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box
                sx={{
                  backgroundColor: '#e0e0e0',
                  width: '150px',
                  height: '35px',
                  borderRadius: '5px',
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#e0e0e0',
                  width: '100px',
                  height: '35px',
                  borderRadius: '5px',
                }}
              />
              <Box
                sx={{
                  backgroundColor: '#e0e0e0',
                  width: '100px',
                  height: '35px',
                  borderRadius: '5px',
                }}
              />
            </Box>
            <Button
              variant="contained"
              sx={{
                backgroundColor: '#3b82f6',
                color: 'white',
                padding: '5px 20px',
                borderRadius: '5px',
                '&:hover': {
                  backgroundColor: '#2563eb',
                },
              }}
            >
              Submit
            </Button>
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '10px 20px',
              borderBottom: '1px solid #e0e0e0',
            }}
          >
            {Array(8)
              .fill('')
              .map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: '80px',
                    height: '10px',
                    backgroundColor: '#e0e0e0',
                    borderRadius: '5px',
                    marginRight: '10px',
                  }}
                />
              ))}
          </Box>

          <Stack
            spacing={2}
            sx={{
              padding: '20px',
              backgroundColor: '#f7f9fc',
              maxHeight: '400px',
              overflowY: 'auto',
            }}
          >
            {inventory.map(({ name, quantity }) => (
              <Box
                key={name}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '10px 20px',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h6" color="#333">
                  {name.charAt(0).toUpperCase() + name.slice(1)}
                </Typography>
                <Typography variant="h6" color="#333">
                  {quantity}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => removeItem(name)}
                  sx={{
                    color: '#f87171',
                    borderColor: '#f87171',
                    '&:hover': {
                      backgroundColor: '#fef2f2',
                      borderColor: '#ef4444',
                    },
                  }}
                >
                  Remove
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
