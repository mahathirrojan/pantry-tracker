'use client'
import { useRouter } from 'next/navigation'
import { Box, Typography, Button, Stack } from '@mui/material'

export default function Home() {
  const router = useRouter()

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column" 
      justifyContent="center" 
      alignItems="center" 
      gap={4}
      sx={{
        background: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)',
      }}
    >
      <Typography variant="h2" color="white" sx={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}>
        Welcome to Pantry Tracker
      </Typography>
      
      <Typography 
        variant="h6" 
        color="white" 
        sx={{ 
          textAlign: 'center', 
          maxWidth: '600px', 
          textShadow: '1px 1px 5px rgba(0, 0, 0, 0.3)' 
        }}
      >
        Manage your pantry inventory with ease. Keep track of all the items in your pantry and never run out of essentials again!
      </Typography>
      
      <Button 
        variant="contained" 
        size="large" 
        onClick={() => router.push('/pantry/')}
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
        Take me there
      </Button>
    </Box>
  )
}
