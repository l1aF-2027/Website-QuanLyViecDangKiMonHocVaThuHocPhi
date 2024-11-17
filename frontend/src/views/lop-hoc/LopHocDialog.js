import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createLopHoc, updateLopHoc } from './LopHocServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllChuongTrinhHoc } from '../chuong-trinh-hoc/ChuongTrinhHocServices';

export default function LopHocDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listChuongTrinh: [] });

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
      let data = await getAllChuongTrinhHoc();
      if (data?.status === code.success) {
        setValue((pre) => ({ ...pre, listChuongTrinh: data?.data }));
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    setValue((pre) => ({ ...pre, ...item }));
    console.log(item);
    getListOptions();
  }, []);

  let convertDataSubmit = (data) => {
    return {
      idLopHoc: data?.idLopHoc,
      tenLop: data?.tenLop,
      siSoHienTai: data?.siSoHienTai,
      siSoToiDa: data?.siSoToiDa,
      idChuongTrinhHoc: data?.chuongTrinhHoc?.idChuongTrinhHoc,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.siSoHienTai > value?.siSoToiDa)
      {
        toast.error('Sĩ số hiện tại đã vượt quá sĩ số tối đa.');
        return;
      }
      if (value?.idLopHoc) {
        let data = await updateLopHoc(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createLopHoc(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Lớp học đã tồn tại.');
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
        <DialogTitle>{value?.idLopHoc ? 'Cập nhật' : 'Thêm mới'} lớp học</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenLop"
            label="Tên lớp"
            value={value?.tenLop}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={value?.listChuongTrinh || []}
            value={value?.chuongTrinhHoc || item?.chuongTrinhHoc}
            getOptionLabel={(option) => option.idChuongTrinhHoc}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'chuongTrinhHoc')}
            renderInput={(params) => (
              <TextField {...params} label="Chương trình học" variant="standard" />
            )}
          />
          <TextField
            required
            margin="dense"
            name="siSoToiDa"
            type="number"
            label="Sĩ số tối da"
            value={value?.siSoToiDa}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            name="siSoHienTai"
            type="number"
            label="Sĩ số hiện tại"
            value={value?.siSoHienTai}
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
