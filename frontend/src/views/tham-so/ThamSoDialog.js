import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createThamSo, updateThamSo } from './ThamSoServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';

export default function ThamSoDialog({ open, handleClose, item, updateData }) {
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
      id: data?.id,
      tienHocMoiTinChiLyThuyet: +data?.tienHocMoiTinChiLyThuyet,
      tienHocMoiTinChiThucHanh: +data?.tienHocMoiTinChiThucHanh,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.id) {
        let data = await updateThamSo(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createThamSo(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Giá trị của tham số phải lớn hơn hoặc bằng 0.');
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
        <DialogTitle>{value?.id ? 'Cập nhật' : 'Thêm mới'} tham số</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            type="number"
            margin="dense"
            name="tienHocMoiTinChiLyThuyet"
            label="Tiền học mỗi tín chỉ lý thuyết"
            value={value?.tienHocMoiTinChiLyThuyet}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="number"
            margin="dense"
            name="tienHocMoiTinChiThucHanh"
            label="Tiền học mỗi tín chỉ thực hành"
            value={value?.tienHocMoiTinChiThucHanh}
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
