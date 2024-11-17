import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createHocKy, updateHocKy } from './HocKyServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

export default function HocKyDialog({ open, handleClose, item, updateData }) {
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
      idHocKy: data?.idHocKy,
      tenHocKy: data?.tenHocKy,
      namHoc: data?.namHoc,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idHocKy) {
        let data = await updateHocKy(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createHocKy(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Học kỳ đã tồn tại.');
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
        <DialogTitle>{value?.idHocKy ? 'Cập nhật' : 'Thêm mới'} học kỳ</DialogTitle>
        <DialogContent>
        <FormControl fullWidth variant="standard" margin="dense">
          <InputLabel id="hoc-ky-label">Học kỳ</InputLabel>
          <Select
            labelId="hoc-ky-label"
            id="hoc-ky-select"
            name="tenHocKy"
            value={value?.tenHocKy}
            onChange={handleChange}
            label="Học kỳ"
            required
          >
            <MenuItem value="1">1</MenuItem>
            <MenuItem value="2">2</MenuItem>
            <MenuItem value="Hè">Hè</MenuItem>
          </Select>
        </FormControl>
          <TextField
            required
            type="number"
            margin="dense"
            name="namHoc"
            label="Năm học"
            value={value?.namHoc}
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
