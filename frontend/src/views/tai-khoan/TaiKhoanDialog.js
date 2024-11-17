import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createTaiKhoan, updateTaiKhoan } from './TaiKhoanServices';
import { code, role } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllSinhVien } from '../sinh-vien/SinhVienServices';

export default function TaiKhoanDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listSinhVien: [] });

  const handleChange = (e, source) => {
    if (source) {
      setValue((pre) => ({ ...pre, [source]: e }));
    } else {
      let { name, value } = e.target;
      setValue((pre) => ({ ...pre, [name]: value }));
    }
  };

  const getListOptions = async () => {
    try {
      let data = await getAllSinhVien();
      if (data?.status === code.success) {
        setValue((pre) => ({ ...pre, listSinhVien: data?.data }));
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    setValue((pre) => ({ ...pre, ...item }));
    getListOptions();
  }, []);

  let convertDataSubmit = (data) => {
    return {
      idTk: data?.idTk,
      tenTaiKhoan: data?.tenTaiKhoan,
      idSinhVien: data?.sinhVien?.idSinhVien,
      matKhau: data?.matKhau,
      vaiTro: data?.vaiTro,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idTk) {
        let data = await updateTaiKhoan(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createTaiKhoan(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Tài khoản đã tồn tại.');
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
        <DialogTitle>{value?.idTk ? 'Cập nhật' : 'Thêm mới'} tài khoản</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenTaiKhoan"
            label="Tên tài khoản"
            value={value?.tenTaiKhoan}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={value?.listSinhVien || []}
            value={value?.sinhVien || item?.sinhVien}
            getOptionLabel={(option) => option.hoTen}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'sinhVien')}
            renderInput={(params) => <TextField {...params} label="Sinh viên" variant="standard" />}
          />
          <TextField
            required
            margin="dense"
            name="matKhau"
            label="Mật khẩu"
            value={value?.matKhau}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          {/* <TextField
            required
            margin="dense"
            name="vaiTro"
            label="Vai trò"
            value={value?.vaiTro}
            onChange={handleChange}
            fullWidth
            variant="standard"
          /> */}
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={role}
            value={value?.vaiTro || item?.vaiTro}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'vaiTro')}
            renderInput={(params) => <TextField {...params} label="Vai trò" variant="standard" />}
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
