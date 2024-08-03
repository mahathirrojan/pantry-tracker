// recipes/page.js
import Sidebar from '../components/SideBar'
import { Box, Typography } from '@mui/material'

export default function Recipes() {
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
        <Typography
          variant="h2"
          color="white"
          sx={{ textShadow: '2px 2px 8px rgba(0, 0, 0, 0.5)' }}
        >
          Recipes Coming Soon
        </Typography>
      </Box>
    </Box>
  )
}
