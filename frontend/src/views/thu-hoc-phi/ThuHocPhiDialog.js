import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { createThuHocPhi, updateThuHocPhi } from './ThuHocPhiServices';
import { code, convertDate } from 'src/const';
import { toast } from 'react-toastify';
import { Autocomplete } from '@mui/material';
import { getAllSinhVien, getTotalTuitionByStudentId } from '../sinh-vien/SinhVienServices';
import { getAllHocKy } from '../hoc-ky/HocKyServices';

export default function ThuHocPhiDialog({ open, handleClose, item, updateData }) {
  const [valueItem, setValueItem] = React.useState({ listSinhVien: [] });

  const handleChange = (e, source) => {
    if (source) {
      setValueItem((pre) => ({ ...pre, [source]: e }));
    } else {
      let { name, value } = e.target;
      setValueItem((pre) => ({ ...pre, [name]: value }));
      if (name === 'soTienDong') {
        setValueItem((pre) => ({ ...pre, soTienConLai: valueItem?.soTienDk - Number(value) }));
      }
    }
  };

  const getListOptions = async () => {
    try {
      let data = await getAllSinhVien();
      let dataHocKy = await getAllHocKy();
      if (data?.status === code.success) {
        setValueItem((pre) => ({
          ...pre,
          listSinhVien: data?.data,
          listHocKy: dataHocKy?.data,
        }));
      }
    } catch (error) {}
  };
  React.useEffect(() => {
    setValueItem((pre) => ({
      ...pre,
      ...item,
      ngayLapPhieuThuHp: convertDate(item?.ngayLapPhieuThuHp || new Date()),
    }));
    getListOptions();
  }, []);

  let convertDataSubmit = (data) => {
    return {
      soPhieuThuHp: data?.soPhieuThuHp,
      idSinhVien: data?.sinhVien?.idSinhVien,
      idHocKy: data?.hocKy?.idHocKy,
      soTienDk: Number(data?.soTienDk),
      soTienDong: Number(data?.soTienDong),
      soTienConLai: Number(data?.soTienConLai),
      ngayLapPhieuThuHp: convertDate(data?.ngayLapPhieuThuHp),
    };
  };
  const getSoTienDanKy = async () => {
    try {
      if (valueItem?.sinhVien?.idSinhVien && valueItem?.hocKy?.idHocKy) {
        const res = await getTotalTuitionByStudentId(
          valueItem?.sinhVien?.idSinhVien,
          valueItem?.hocKy?.idHocKy,
        );
        if (res?.status === code.success) {
          setValueItem((pre) => ({
            ...pre,
            soTienDk: res?.data?.finalTuition,
            soTienConLai: res?.data?.finalTuition - valueItem?.soTienDong,
          }));
        }
      }
    } catch (error) {}
  };

  React.useEffect(() => {
    getSoTienDanKy();
  }, [valueItem?.sinhVien?.idSinhVien, valueItem?.hocKy?.idHocKy]);
  const handleFormSubmit = async () => {
    try {
      let payload = convertDataSubmit(valueItem);
      if (valueItem?.soPhieuThuHp) {
        let data = await updateThuHocPhi(payload);
        if (data?.status === code.success) {
          toast.success('Cập nhật thành công.');
        }
      } else {
        let data = await createThuHocPhi(payload);
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
        <DialogTitle>{valueItem?.soPhieuThuHp ? 'Cập nhật' : 'Thêm mới'} học phí</DialogTitle>
        <DialogContent>
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={valueItem?.listSinhVien || []}
            value={valueItem?.sinhVien || item?.sinhVien}
            getOptionLabel={(option) => option.hoTen}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'sinhVien')}
            renderInput={(params) => <TextField {...params} label="Sinh viên" variant="standard" />}
          />
          <Autocomplete
            variant="standard"
            id="combo-box-demo"
            options={valueItem?.listHocKy || []}
            value={valueItem?.hocKy || item?.hocKy}
            getOptionLabel={(option) => `${option.tenHocKy}${option.namHoc ? ` - ${option.namHoc}` : ''}`}
            noOptionsText="Không có bản ghi nào"
            onChange={(e, value) => handleChange(value, 'hocKy')}
            renderInput={(params) => <TextField {...params} label="Hoc kỳ" variant="standard" />}
          />
          <TextField
            type="date"
            margin="dense"
            name="ngayLapPhieuThuHp"
            label="Ngày lập phiếu thu"
            value={valueItem?.ngayLapPhieuThuHp}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            inputProps={{
              readOnly: true,
            }}
            margin="dense"
            name="soTienDk"
            label="Số tiền đăng ký"
            value={valueItem?.soTienDk || ''}
            defaultValue={valueItem?.soTienDk || ''}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            type="number"
            margin="dense"
            name="soTienDong"
            label="Số tiền đóng"
            value={valueItem?.soTienDong}
            onChange={handleChange}
            fullWidth
            variant="standard"
          />
          <TextField
            inputProps={{
              readOnly: true,
            }}
            margin="dense"
            name="soTienConLai"
            label="Số tiền còn lại"
            value={valueItem?.soTienConLai || ''}
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
