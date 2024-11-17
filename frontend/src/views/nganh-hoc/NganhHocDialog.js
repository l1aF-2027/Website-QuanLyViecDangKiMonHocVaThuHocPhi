import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createNganhHoc, updateNganhHoc } from './NganhHocServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllKhoa } from '../khoa/KhoaServices';

export default function NganhHocDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listKhoa: [] });

  const handleChange = (e, source) => {
    if (source) {
      setValue((pre) => ({ ...pre, [source]: e }));
    } else {
      let { name, value } = e.target;
      setValue((pre) => ({ ...pre, [name]: value }));
    }
  };

  const getListKhoa = async () => {
    try {
      let data = await getAllKhoa();
      if (data?.status === code.success) {
        setValue((pre) => ({ ...pre, listKhoa: data?.data }));
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    setValue((pre) => ({ ...pre, ...item }));
    console.log(item);
    getListKhoa();
  }, []);

  let convertDataSubmit = (data) => {
    return {
      idNganhHoc: data?.idNganhHoc,
      tenNganhHoc: data?.tenNganhHoc,
      idKhoa: data?.khoa?.idKhoa,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idNganhHoc) {
        let data = await updateNganhHoc(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createNganhHoc(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Ngành học đã tồn tại.');
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
        <DialogTitle>{value?.idNganhHoc ? 'Cập nhật' : 'Thêm mới'} ngành học</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenNganhHoc"
            label="Tên ngành học"
            value={value?.tenNganhHoc}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={value?.listKhoa || []}
            value={value?.khoa || item?.khoa}
            getOptionLabel={(option) => option.tenKhoa}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'khoa')}
            renderInput={(params) => <TextField {...params} label="Khoa" variant="standard" />}
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
