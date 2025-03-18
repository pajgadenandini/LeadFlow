import React, { useState } from 'react';
import { 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle, 
  Button, 
  Slide 
} from "@mui/material";
import { TransitionProps } from '@mui/material/transitions';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationDialog({ 
  open, 
  onClose, 
  onConfirm 
}: DeleteConfirmationDialogProps) {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      TransitionComponent={Transition}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          color: 'error.main',
          fontWeight: 'bold'
        }}
      >
        <WarningAmberIcon sx={{ mr: 2, fontSize: 32 }} />
        Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText 
          sx={{ 
            display: 'flex', 
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <DeleteForeverIcon 
            sx={{ 
              mr: 2, 
              fontSize: 48, 
              color: isHovering ? 'error.dark' : 'error.main',
              transition: 'transform 0.3s, color 0.3s',
              transform: isHovering ? 'scale(1.2) rotate(15deg)' : 'scale(1)',
            }}
          />
          Are you sure you want to delete this lead? 
          This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{ justifyContent: 'center', p: 3 }}>
        <Button 
          onClick={onClose} 
          color="primary" 
          variant="outlined"
          sx={{ mr: 2 }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          startIcon={<DeleteForeverIcon />}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
          sx={{
            transition: 'transform 0.3s',
            '&:hover': {
              transform: 'scale(1.05)',
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}