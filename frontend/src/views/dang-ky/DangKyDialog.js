import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createDangKy, updateDangKy } from './DangKyServices';
import { code, convertDate } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllSinhVien } from '../sinh-vien/SinhVienServices';
import { getAllLopHoc } from '../lop-hoc/LopHocServices';

export default function DangKyDialog({ open, handleClose, item, updateData }) {
  const [value, setValue] = React.useState({ listSinhVien: [], listLopHoc: [] });
  const [filteredLopHoc, setFilteredLopHoc] = React.useState([]);

  const handleChange = (e, source) => {
    if (source) {
      setValue((pre) => ({ ...pre, [source]: e }));
      if (source === 'sinhVien') {
        filterLopHoc(e);
      }
    } else {
      let { name, value } = e.target;
      setValue((pre) => ({ ...pre, [name]: value }));
    }
  };

  const filterLopHoc = (sinhVien) => {
    if (sinhVien && value.listLopHoc) {
      const filtered = value.listLopHoc.filter(lop => 
        lop.chuongTrinhHoc.nganhHoc.idNganhHoc === sinhVien.nganhHoc.idNganhHoc
      );
      setFilteredLopHoc(filtered);
    } else {
      setFilteredLopHoc([]);
    }
  };

  const getListOptions = async () => {
    try {
      let data = await getAllSinhVien();
      let dataLopHoc = await getAllLopHoc();
      if (data?.status === code.success) {
        setValue((pre) => ({
          ...pre,
          listSinhVien: data?.data,
          listLopHoc: dataLopHoc?.data,
        }));
        if (item?.sinhVien) {
          filterLopHoc(item.sinhVien);
        }
      }
    } catch (error) {
      console.error("Error fetching options:", error);
    }
  };

  React.useEffect(() => {
    setValue((pre) => ({
      ...pre,
      ...item,
      ngayLapPhieuDk: convertDate(item?.ngayLapPhieuDk || new Date()),
    }));
    getListOptions();
  }, [item]);

  let convertDataSubmit = (data) => {
    return {
      soPhieuDK: data?.soPhieuDk,
      idSinhVien: data?.sinhVien?.idSinhVien,
      idLopHoc: data?.lopHoc?.idLopHoc,
      ngayLapPhieuDK: convertDate(data?.ngayLapPhieuDk),
    };
  };

  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(value);
      if (value?.soPhieuDk) {
        let data = await updateDangKy(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createDangKy(payload);
        if (data?.status === code.success) {
          toast.success('Thêm mới thành công.');
        }
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
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
        <DialogTitle>{value?.soPhieuDk ? 'Cập nhật' : 'Thêm mới'} đăng ký</DialogTitle>
        <DialogContent>
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
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={filteredLopHoc}
            value={value?.lopHoc || item?.lopHoc}
            getOptionLabel={(option) => `${option.tenLop} ${option?.chuongTrinhHoc?.hocKy.tenHocKy ? ` : Học kỳ ${option?.chuongTrinhHoc?.hocKy.tenHocKy}` : ''} ${option?.chuongTrinhHoc?.hocKy.namHoc ? ` - ${option?.chuongTrinhHoc?.hocKy.namHoc}` : ''}`}
            noOptionsText="Không có lớp học phù hợp"
            onChange={(e, value) => handleChange(value, 'lopHoc')}
            renderInput={(params) => <TextField {...params} label="Lớp học" variant="standard" />}
          />
          <TextField
            type="date"
            margin="dense"
            name="ngayLapPhieuDk"
            label="Ngày lập phiếu đăng ký"
            value={value?.ngayLapPhieuDk}
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