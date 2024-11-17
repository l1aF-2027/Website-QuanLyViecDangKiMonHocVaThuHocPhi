import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialog({ open, handleClose, handleOke }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          // onSubmit: (event) => {
          //   event.preventDefault();
          //   handleClose();
          // },
        }}
      >
        <DialogTitle>Xác nhận thông tin</DialogTitle>
        <DialogContent>Xác nhận xóa thông tin!!!</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleOke}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
