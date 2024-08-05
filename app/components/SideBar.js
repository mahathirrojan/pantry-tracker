// components/SideBar.js
'use client'
import React from 'react'
import { Box, Typography, Stack, Button } from '@mui/material'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const router = useRouter()

  return (
    <Box
      sx={{
        width: '250px',
        height: '100vh',
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 3,
      }}
    >
      <Typography
        variant="h4"
        color="white"
        sx={{
          marginBottom: '40px',
          textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)',
        }}
      >
        Pantry Tracker
      </Typography>
      <Stack direction="column" spacing={3} width="100%">
        <Button
          variant="text"
          onClick={() => router.push('/')}
          sx={{
            color: 'white',
            textTransform: 'none',
            fontSize: '18px',
            width: '100%',
            justifyContent: 'flex-start',
            '&:hover': {
              backgroundColor: '#FF6B6B',
            },
          }}
        >
          Home
        </Button>
        <Button
          variant="text"
          onClick={() => router.push('/pantry')}
          sx={{
            color: 'white',
            textTransform: 'none',
            fontSize: '18px',
            width: '100%',
            justifyContent: 'flex-start',
            '&:hover': {
              backgroundColor: '#FF6B6B',
            },
          }}
        >
          Pantry
        </Button>
        <Button
          variant="text"
          onClick={() => router.push('/recipes')}
          sx={{
            color: 'white',
            textTransform: 'none',
            fontSize: '18px',
            width: '100%',
            justifyContent: 'flex-start',
            '&:hover': {
              backgroundColor: '#FF6B6B',
            },
          }}
        >
          Recipes
        </Button>
      </Stack>
    </Box>
  )
}

export default Sidebar