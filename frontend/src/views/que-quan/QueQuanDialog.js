import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createQueQuan, updateQueQuan } from './QueQuanServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';

export default function QueQuanDialog({ open, handleClose, item, updateData }) {
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
      idQueQuan: data?.idQueQuan,
      tenHuyen: data?.tenHuyen,
      tenTinh: data?.tenTinh,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idQueQuan) {
        let data = await updateQueQuan(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createQueQuan(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Quê quán đã tồn tại.');
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
        <DialogTitle>{value?.idQueQuan ? 'Cập nhật' : 'Thêm mới'} quê quán</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenHuyen"
            label="Tên huyện"
            value={value?.tenHuyen}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="tenTinh"
            label="Tên tỉnh"
            value={value?.tenTinh}
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
