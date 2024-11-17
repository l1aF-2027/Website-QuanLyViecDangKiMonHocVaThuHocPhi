import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createSinhVien, updateSinhVien } from './SinhVienServices';
import { code, convertDate } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllQueQuan } from '../que-quan/QueQuanServices';
import { getAllDoiTuong } from '../doi-tuong/DoiTuongServices';
import { getAllNganhHoc } from '../nganh-hoc/NganhHocServices';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
export default function SinhVienDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listLoaiSinhVien: [] });

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
      let data = await getAllQueQuan();
      let dataDoiTuong = await getAllDoiTuong();
      let dataNganhHoc = await getAllNganhHoc();
      setValue((pre) => ({
        ...pre,
        listQueQuan: data?.data,
        listDoiTuong: dataDoiTuong?.data,
        listNganhHoc: dataNganhHoc?.data,
      }));
    } catch (error) {}
  };
  React.useEffect(() => {
    setValue((pre) => ({ ...pre, ...item, ngaySinh: convertDate(item?.ngaySinh || new Date()) }));
    getListOptions();
  }, []);

  let convertDataSubmit = (data) => {
    return {
      idSinhVien: data?.idSinhVien,
      hoTen: data?.hoTen,
      gioiTinh: data?.gioiTinh,
      ngaySinh: convertDate(data?.ngaySinh),
      idQueQuan: data?.queQuan?.idQueQuan,
      idDoiTuong: data?.doiTuong?.idDoiTuong,
      idNganhHoc: data?.nganhHoc?.idNganhHoc,
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.idSinhVien) {
        let data = await updateSinhVien(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createSinhVien(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Lỗi thông tin sinh viên.');
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
        <DialogTitle>{value?.idSinhVien ? 'Cập nhật' : 'Thêm mới'} sinh viên</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            name="hoTen"
            label="Tên sinh viên"
            value={value?.hoTen}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          
          <FormControl fullWidth variant="standard">
          <InputLabel id="gioi-tinh-label">Giới tính</InputLabel>
          <Select
            labelId="gioi-tinh-label"
            id="gioi-tinh-select"
            value={value?.gioiTinh}
            onChange={handleChange}
            label="Giới tính"
            name="gioiTinh"
          >
            <MenuItem value="Nam">Nam</MenuItem>
            <MenuItem value="Nữ">Nữ</MenuItem>
          </Select>
        </FormControl>
          
          <TextField
            required
            type="date"
            margin="dense"
            name="ngaySinh"
            label="Ngày sinh"
            value={value?.ngaySinh}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <Autocomplete
            required
            variant="standard"
            id="combo-box-demo"
            options={value?.listDoiTuong || []}
            value={value?.doiTuong || item?.doiTuong}
            getOptionLabel={(option) => option.tenLoaiDoiTuong}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'doiTuong')}
            renderInput={(params) => <TextField {...params} label="Đối tượng" variant="standard" />}
          />
          <Autocomplete
            required
            variant="standard"
            id="combo-box-demo"
            options={value?.listQueQuan || []}
            value={value?.queQuan || item?.queQuan}
            getOptionLabel={(option) => `${option.tenTinh}${option.tenHuyen ? ` - ${option.tenHuyen}` : ''}`}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'queQuan')}
            renderInput={(params) => <TextField {...params} label="Quê quán" variant="standard" />}
          />
          <Autocomplete
            required
            variant="standard"
            id="combo-box-demo"
            options={value?.listNganhHoc || []}
            value={value?.nganhHoc || item?.nganhHoc}
            getOptionLabel={(option) => option.tenNganhHoc}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'nganhHoc')}
            renderInput={(params) => <TextField {...params} label="Ngành học" variant="standard" />}
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
