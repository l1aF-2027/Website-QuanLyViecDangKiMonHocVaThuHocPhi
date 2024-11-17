import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createChuongTrinhHoc, updateChuongTrinhHoc } from './ChuongTrinhHocServices';
import { code } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllSinhVien } from '../sinh-vien/SinhVienServices';
import { getAllHocKy } from '../hoc-ky/HocKyServices';
import { getAllNganhHoc } from '../nganh-hoc/NganhHocServices';
import { getAllMonHoc } from '../mon-hoc/MonHocServices';

export default function ChuongTrinhHocDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listHocKy: [] });

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
      let data = await getAllHocKy();
      let dataNganhHoc = await getAllNganhHoc();
      let dataMonHoc = await getAllMonHoc();
      if (data?.status === code.success) {
        setValue((pre) => ({
          ...pre,
          listHocKy: data?.data,
          listNganhHoc: dataNganhHoc?.data,
          listMonHoc: dataMonHoc?.data,
        }));
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
      idChuongTrinhHoc: data?.idChuongTrinhHoc,
      idNganhHoc: data?.nganhHoc?.idNganhHoc,
      idHocKy: data?.hocKy?.idHocKy,
      idMonHoc: data?.monHoc?.idMonHoc,
      ghiChu: data?.ghiChu,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idChuongTrinhHoc) {
        let data = await updateChuongTrinhHoc(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createChuongTrinhHoc(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Chương trình học đã tồn tại.');
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
        <DialogTitle>
          {value?.idChuongTrinhHoc ? 'Cập nhật' : 'Thêm mới'} chương trình học
        </DialogTitle>
        <DialogContent>
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={value?.listHocKy || []}
            value={value?.hocKy || item?.hocKy}
            getOptionLabel={(option) => `${option.tenHocKy}${option.namHoc ? ` - ${option.namHoc}` : ''}`}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'hocKy')}
            renderInput={(params) => <TextField {...params} label="Học kỳ" variant="standard" />}
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={value?.listNganhHoc || []}
            value={value?.nganhHoc || item?.nganhHoc}
            getOptionLabel={(option) => option.tenNganhHoc}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'nganhHoc')}
            renderInput={(params) => <TextField {...params} label="Ngành học" variant="standard" />}
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={value?.listMonHoc || []}
            value={value?.monHoc || item?.monHoc}
            getOptionLabel={(option) => `${option.tenMonHoc}${option?.loaiMon?.tenLoaiMon ? ` - ${option?.loaiMon?.tenLoaiMon}` : ''}`}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'monHoc')}
            renderInput={(params) => <TextField {...params} label="Môn học" variant="standard" />}
          />
          <TextField
            required
            margin="dense"
            name="ghiChu"
            label="Ghi chú"
            value={value?.ghiChu}
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
