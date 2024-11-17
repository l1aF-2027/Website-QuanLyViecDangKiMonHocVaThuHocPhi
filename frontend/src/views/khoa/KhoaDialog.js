import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createKhoa, updateKhoa } from './KhoaServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';

export default function KhoaDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState(null);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setValue((pre) => ({ ...pre, [name]: value }));
  };

  React.useEffect(() => {
    setValue({ ...item });
  }, []);

  let convertDataSubmit = (data) => {
    return {
      idKhoa: data?.idKhoa,
      tenKhoa: data?.tenKhoa,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idKhoa) {
        let data = await updateKhoa(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createKhoa(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Khoa đã tồn tại.');
    } finally {
      handleClose();
      updateData();
    }
  };
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
            handleFormSubmit();
          },
        }}
      >
        <DialogTitle>Thêm mới khoa</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenKhoa"
            label="Tên khoa"
            value={value?.tenKhoa}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button type="submit">Lưu</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
