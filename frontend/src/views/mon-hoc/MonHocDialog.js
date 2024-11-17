import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createMonHoc, updateMonHoc } from './MonHocServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllLoaiMonHoc } from '../loai-mon-hoc/LoaiMonHocServices';

export default function MonHocDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listLoaiMonHoc: [] });

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
      let data = await getAllLoaiMonHoc();
      if (data?.status === code.success) {
        setValue((pre) => ({ ...pre, listLoaiMonHoc: data?.data }));
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
      idMonHoc: data?.idMonHoc,
      tenMonHoc: data?.tenMonHoc,
      idLoaiMon: data?.loaiMon?.idLoaiMon,
      soTiet: data?.soTiet,
      tinChi: data?.tinChi,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if ((value?.tinChi * 15 !== value?.soTiet * 1 && value?.loaiMon?.tenLoaiMon === 'LT') || (value?.tinChi * 30 !== value?.soTiet * 1 && value?.loaiMon?.tenLoaiMon === 'TH'))
      {
        if (value?.loaiMon?.tenLoaiMon === 'LT')
        {
          toast.error('Số tín chỉ của môn học thuộc loại LT phải bằng số tiết chia cho 15.');
        }
        else 
        {
          toast.error('Số tín chỉ của môn học thuộc loại TH phải bằng số tiết chia cho 30.');
        }
        return;
      }
      if (value?.idMonHoc) {
        let data = await updateMonHoc(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createMonHoc(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Môn học đã tồn tại.');
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
        <DialogTitle>{value?.idMonHoc ? 'Cập nhật' : 'Thêm mới'} môn học</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="tenMonHoc"
            label="Tên môn học"
            value={value?.tenMonHoc}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={value?.listLoaiMonHoc || []}
            value={value?.loaiMon || item?.loaiMon}
            getOptionLabel={(option) => option.tenLoaiMon}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'loaiMon')}
            renderInput={(params) => (
              <TextField {...params} label="Loại môn học" variant="standard" />
            )}
          />
          <TextField
            required
            type="number"
            margin="dense"
            name="soTiet"
            label="Số tiết"
            value={value?.soTiet}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            required
            type="number"
            margin="dense"
            name="tinChi"
            label="Số tín chỉ"
            value={value?.tinChi}
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
