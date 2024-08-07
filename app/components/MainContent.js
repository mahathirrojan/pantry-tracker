import { Box, Typography, Modal, Stack, TextField, Button } from "@mui/material";

export default function MainContent({ inventory, open, handleOpen, handleClose, itemName, setItemName, addItem, removeItem }) {
    return (
      <Box width="100vw" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap={2}>
        <Modal open={open} onClose={handleClose}> 
          <Box position="absolute" top="50%" left="50%" width={400} bgcolor="white" boxShadow={24} p={4} display="flex" flexDirection="column" gap={3} sx={{transform: "translate(-50%,-50%)" }}>
            <Typography variant="h6"> Add Item</Typography>
            <Stack width="100%" direction="row" spacing={2}>
              <TextField
                variant="outlined"
                fullWidth
                value={itemName}
                onChange={(e) => {
                  setItemName(e.target.value); 
                }}/>
              <Button variant="outlined" onClick={() => {
                addItem(itemName);
                setItemName('');
                handleClose();
              }}>
                Add
              </Button>
            </Stack>
          </Box>
        </Modal>
        <Button variant="contained" onClick={handleOpen}> Add New Item </Button>
        <Box border="1px solid #333">
          <Box width="800px" height="100px" bgcolor="#ADD8E6" display="flex" alignItems="center" justifyContent="center">
            <Typography variant="h2" color="#333">Inventory Items</Typography>
          </Box>
          <Stack width="800px" height="300px" spacing={2} overflow="auto">
            {inventory.map(({ name, quantity }) => (
              <Box key={name} width="100%" minHeight="150px" display="flex" justifyContent="space-between" bgcolor="#f0f0f0" padding={5}>
                <Typography variant="h3" color='#333' textAlign="center">{name.charAt(0).toUpperCase() + name.slice(1)}</Typography>
                <Typography variant="h3" color='#333' textAlign="center">{quantity}</Typography>
                <Button variant="contained" onClick={() => {
                  removeItem(name);
                }}> 
                  Remove 
                </Button>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    );
  }
  