import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
// eslint-disable-next-line
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import {
  Paper, 
  List, 
  Autocomplete,
  TextField,
  Radio,
  Box,
  Tooltip,
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { code, convertDate, formatCost } from 'src/const';
import { Grid } from '@material-ui/core';
import { getAllHocKy } from '../hoc-ky/HocKyServices';
// eslint-disable-next-line
import { getAllMonHoc } from '../mon-hoc/MonHocServices';
// eslint-disable-next-line
import { getAllLopHoc, getByNganhHocHocKyMonHoc } from '../lop-hoc/LopHocServices';
import { Bookmark, CurrencyExchange, Delete, Discount, Money } from '@mui/icons-material';
import DangKyHocPhanDialog from './DangKyHocPhanDialog';
import { getMonHocByHocKy } from '../chuong-trinh-hoc/ChuongTrinhHocServices';
import { getAllNganhHoc } from '../nganh-hoc/NganhHocServices';
import { getDanhSachDK, getTotalTuitionByStudentId } from '../sinh-vien/SinhVienServices';
import { createDangKy, deleteDangKy } from '../dang-ky/DangKyServices';
import ConfirmDialog from 'src/components/dialog/ConfirmDialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';

const DangKyHocPhan = () => {
  let currentUser = JSON.parse(sessionStorage.getItem('user'))?.sinhVien?.idSinhVien;
  let currentUserName = JSON.parse(sessionStorage.getItem('user'))?.sinhVien?.hoTen;
  let currentUserNganhHoc = JSON.parse(sessionStorage.getItem('user'))?.sinhVien?.nganhHoc
    ?.idNganhHoc;
  const [value, setValue] = React.useState(null);
  const [listItems, setListItems] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);
  const [openConfirm, setOpenConfirm] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [itemReg, setItemReg] = React.useState(null);

  const handleClose = () => {
    setOpenConfirm(false);
    setOpenDelete(false);
  };

  const handleCancle = (rowData) => {
    setOpenDelete(true);
    setValue((pre) => ({ ...pre, itemCancel: rowData }));
  };

  const getAllDangKyHocPhan = async () => {
    try {
      let isAllowSearch = value?.hocKy?.idHocKy && currentUserNganhHoc;
      let payload = {
        idHocKy: value?.hocKy?.idHocKy,
        idNganhHoc: currentUserNganhHoc,
      };
      if (isAllowSearch) {
        const response = await getMonHocByHocKy(payload);
        if (response?.status === code.success) {
          setListItems(response?.data);
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

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
      if (data?.status === code.success) {
        setValue((pre) => ({
          ...pre,
          listHocKy: data?.data,
          listNganhHoc: dataNganhHoc?.data,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getClass = async () => {
    try {
      let isAllowSearch = value?.hocKy?.idHocKy && currentUserNganhHoc && selectedRow?.idMonHoc;
      let payload = {
        idHocKy: value?.hocKy?.idHocKy,
        idNganhHoc: currentUserNganhHoc,
        idMonHoc: selectedRow?.idMonHoc,
      };
      if (isAllowSearch) {
        const response = await getByNganhHocHocKyMonHoc(payload);
        if (response?.status === code.success) {
          // setListItems(response?.data);
          setValue((pre) => ({
            ...pre,
            listLopHoc: response?.data,
          }));
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getListClassReged = async () => {
    try {
      if (currentUser && value?.hocKy?.idHocKy) {
        const response = await getDanhSachDK(currentUser, value?.hocKy?.idHocKy);
        if (response?.status === code.success) {
          setValue((pre) => ({
            ...pre,
            listClassReged: response?.data,
          }));
        }
      }
    } catch (error) {}
  };

  const handleRegister = (rowData) => {
    setItemReg(rowData);
    setOpenConfirm(true);
  };

  const handleYes = async () => {
    try {
      let payload = {
        idSinhVien: currentUser,
        ngayLapPhieuDK: convertDate(new Date()),
        idLopHoc: itemReg?.idLopHoc,
      };
      const response = await createDangKy(payload);
      if (response?.status === code.success) {
        toast.success('Đăng ký thành công!');
        await getSoTienDanKy();
      } else {
        toast.error('Có lỗi xảy ra khi đăng ký.');
      }
    } catch (error) {
      console.error(error);
      toast.error('Lớp đã đạt đến sĩ số tối đa.');
    } finally {
      handleClose();
      getListClassReged();
    }
  };

  const handleOke = async () => {
    try {
      const data = await deleteDangKy(value?.itemCancel?.soPhieuDK);
      if (data?.status === code.success) {
        toast.success('Xóa thành công!');
        await getSoTienDanKy();
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      handleClose();
      getListClassReged();
    }
  };

  const getSoTienDanKy = async () => {
    try {
      if (currentUser && value?.hocKy?.idHocKy) {
        const res = await getTotalTuitionByStudentId(currentUser, value?.hocKy?.idHocKy);
        if (res?.status === code.success) {
          setValue((pre) => ({ ...pre, ...res?.data }));
        }
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListOptions();
  }, []);

  useEffect(() => {
    getAllDangKyHocPhan();
    getListClassReged();
  }, [value?.hocKy, value?.nganhHoc]);

  useEffect(() => {
    getSoTienDanKy();
  }, [value?.hocKy?.idHocKy]);

  useEffect(() => {
    getClass();
  }, [selectedRow]);

  useEffect(() => {
    getListClassReged();
  }, []);

  return (
    <PageContainer title="Đăng ký học phần" description="">
      <DashboardCard title="Đăng ký học phần">
        <Grid container spacing={2} style={{ marginBottom: 5 }}>
          <Grid item lg={3} sm={12} md={6}>
            <Autocomplete
              variant="standard"
              id="combo-box-demo"
              options={value?.listHocKy || []}
              value={value?.hocKy}
              getOptionLabel={(option) => `${option.tenHocKy}${option.namHoc ? ` - ${option.namHoc}` : ''}`}
              noOptionsText="Không có bản ghi nào"
              onChange={(e, value) => handleChange(value, 'hocKy')}
              renderInput={(params) => <TextField {...params} label="Học kỳ" variant="standard" />}
            />
          </Grid>
          {/* <Grid item lg={3} sm={12} md={6}>
            <Autocomplete
              variant="standard"
              id="combo-box-demo"
              options={value?.listNganhHoc || []}
              value={value?.nganhHoc}
              getOptionLabel={(option) => option.tenNganhHoc}
              noOptionsText="Không có bản ghi nào"
              onChange={(e, value) => handleChange(value, 'nganhHoc')}
              renderInput={(params) => (
                <TextField {...params} label="Ngành học" variant="standard" />
              )}
            />
          </Grid> */}
        </Grid>
        {
          <Grid item lg={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <MaterialTable
              title={
                value?.hocKy?.tenHocKy
                  ? `Danh sách các môn học có trong học kỳ ${value?.hocKy?.tenHocKy}`
                  : 'Danh sách các môn học'
              }
              columns={[
                {
                  title: 'Chọn',
                  headerStyle: {
                    textAlign: 'center',
                  },
                  maxWidth: 80,
                  render: (rowData) => (
                    <Radio
                      checked={selectedRow?.tableData.id === rowData.tableData.id}
                      onChange={() => setSelectedRow(rowData)}
                    />
                  ),
                },
                {
                  title: 'Môn học',
                  field: 'tenMonHoc',
                  render: (rowData) => {
                    const monHoc = rowData;
                    if (!monHoc) return '';
                    return `${monHoc.tenMonHoc}${monHoc?.loaiMon?.tenLoaiMon ? ` - ${monHoc?.loaiMon?.tenLoaiMon}` : ''}`;
                  },
                },
                { title: 'Số tiết', field: 'soTiet' },
                { title: 'Tín chỉ', field: 'tinChi' },
              ]}
              data={listItems}
              options={{ ...tableOtion.options, maxBodyHeight: '200px' }}
              localization={tableOtion.localization}
              onRowClick={(e, rowData) => {
                setSelectedRow(rowData);
              }}
            />
          </Grid>
        }

        {
          <Grid item lg={12} sm={12} md={12} style={{ marginBottom: 20 }}>
            <MaterialTable
              title={`Danh sách lớp học`}
              columns={[
                {
                  title: 'Chọn',
                  headerStyle: {
                    textAlign: 'center',
                  },
                  cellStyle: {
                    textAlign: 'center',
                  },
                  maxWidth: 80,
                  render: (rowData) => {
                    return (
                      <Box sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}>
                        <Tooltip title={`Đăng ký lớp ${rowData?.tenLop}`}>
                          <div onClick={() => handleRegister(rowData)}>
                            <Bookmark fontSize="small" sx={{ color: 'warning.main' }} />
                          </div>
                        </Tooltip>
                      </Box>
                    );
                  },
                },
                { title: 'Tên lớp', field: 'tenLop' },
                {
                  title: 'Mã chương trình học',
                  field: 'chuongTrinhHoc',
                  render: (rowData) => rowData?.chuongTrinhHoc?.idChuongTrinhHoc,
                },
                { title: 'Sĩ số hiện tại', field: 'siSoHienTai' },
                { title: 'Sĩ số tối đa', field: 'siSoToiDa' },
              ]}
              data={value?.listLopHoc || []}
              options={{ ...tableOtion.options, maxBodyHeight: '200px' }}
              localization={tableOtion.localization}
            />
          </Grid>
        }

        <Grid item lg={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <MaterialTable
            title={`Danh sách lớp học đã đăng ký`}
            columns={[
              {
                title: 'Thao tác',
                field: '',
                headerStyle: {
                  textAlign: 'center',
                },
                cellStyle: {
                  textAlign: 'center',
                },
                maxWidth: 80,
                render: (rowData) => {
                  return (
                    <Box sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}>
                      <Tooltip title={`Hủy đăng ký lớp ${rowData?.tenLop}`}>
                        <div onClick={() => handleCancle(rowData)}>
                          <Delete fontSize="small" sx={{ color: 'primary.main' }} />
                        </div>
                      </Tooltip>
                    </Box>
                  );
                },
              },
              { title: 'Tên lớp', field: 'tenLop' },
              {
                title: 'Môn học',
                field: 'tenMonHoc',
              },
              {
                title: 'Số tiền học phí',
                field: 'soTienHocPhi',
                render: (rowData) => formatCost(rowData.soTienHocPhi),
              },
              { title: 'Số tín chỉ', field: 'soTinChi' },
            ]}
            data={value?.listClassReged || []}
            options={tableOtion.options}
            localization={tableOtion.localization}
          />
        </Grid>
        
        <Grid item lg={12} sm={12} md={12} style={{ marginBottom: 20 }}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Thông tin học phí của {currentUserName}
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <CurrencyExchange />
                </ListItemIcon>
                <ListItemText
                  primary={`Tổng tiền học phí: ${formatCost(value?.totalTuition)}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Discount />
                </ListItemIcon>
                <ListItemText
                  primary={`Số tiền miễn giảm: ${formatCost(value?.discountAmount)}`}
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <Money />
                </ListItemIcon>
                <ListItemText
                  primary={`Tổng tiền phải đóng: ${formatCost(value?.finalTuition)}`}
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        {openConfirm && (
          <DangKyHocPhanDialog
            open={openConfirm}
            handleClose={handleClose}
            handleYes={handleYes}
            item={itemReg}
          />
        )}
        {openDelete && (
          <ConfirmDialog open={openDelete} handleClose={handleClose} handleOke={handleOke} />
        )}
      </DashboardCard>
    </PageContainer>
  );
};

export default DangKyHocPhan;
