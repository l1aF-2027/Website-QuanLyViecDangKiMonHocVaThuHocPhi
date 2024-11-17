import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function ThongKe({ open, item, handleClose, handleYes }) {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
          },
        }}
      >
        <DialogTitle>Xác nhận đăng ký lớp học</DialogTitle>
        <DialogContent>Bạn có muốn đăng ký lớp học {item?.tenLop} không?</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={handleYes}>Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
