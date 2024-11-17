import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
// eslint-disable-next-line
import { Autocomplete, TextField, Radio, Box, Tab, Button } from '@mui/material';
import { code, convertDate, formatCost } from 'src/const';
import { Grid } from '@material-ui/core';
import { getAllHocKy } from '../hoc-ky/HocKyServices';
// eslint-disable-next-line
import { getMonHocByHocKy } from '../chuong-trinh-hoc/ChuongTrinhHocServices';
import { TabContext, TabList, TabPanel } from '@mui/lab';
// eslint-disable-next-line
import { getAllLopHoc, getClassesBySemester } from '../lop-hoc/LopHocServices';
// eslint-disable-next-line
import { getAllSinhVien, getStudentsByClass } from '../sinh-vien/SinhVienServices';
// eslint-disable-next-line
import { getAllMonHoc } from '../mon-hoc/MonHocServices';
import { getHocPhIByHocKy } from '../thu-hoc-phi/ThuHocPhiServices';

const ThongKe = () => {
  const [tab, setTab] = React.useState('1');
  const [value, setValue] = React.useState(null);
  const [listItems, setListItems] = React.useState([]);
  const [selectedRow, setSelectedRow] = React.useState(null);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const getAll = async () => {
    try {
      let isAllowSearch = value?.hocKy?.idHocKy;
      if (isAllowSearch) {
        const response = await getHocPhIByHocKy(isAllowSearch);
        const responseLopHoc = await getClassesBySemester(isAllowSearch);
        setListItems(
          response?.data?.map((rowData) => {
            return {
              ...rowData,
              sinhVien: rowData?.sinhVien?.hoTen,
              ngayLapPhieuThuHp: convertDate(rowData?.ngayLapPhieuThuHp, true),
              soTienConLai: formatCost(rowData?.soTienConLai),
              soTienDk: formatCost(rowData?.soTienDk),
              soTienDong: formatCost(rowData?.soTienDong),
            };
          }),
        );
        setValue((pre) => ({ ...pre, listLopHoc: responseLopHoc?.data }));
      }
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleChange = (e, source) => {
    if (source) {
      setValue((pre) => ({ ...pre, [source]: e, listSinhVien: [], listLopHoc: [] }));
    } else {
      let { name, value } = e.target;
      setValue((pre) => ({ ...pre, [name]: value }));
    }
  };

  const getListOptions = async () => {
    try {
      let data = await getAllHocKy();
      if (data?.status === code.success) {
        setValue((pre) => ({
          ...pre,
          listHocKy: data?.data,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getListSinhVien = async () => {
    try {
      const response = await getStudentsByClass(selectedRow?.idLopHoc);
      if (response?.status === code.success) {
        setValue((pre) => ({
          ...pre,
          listSinhVien: response?.data?.map((rowData) => ({
            ...rowData,
            ngaySinh: convertDate(rowData?.ngaySinh, true),
            nganhHoc: rowData?.nganhHoc?.tenNganhHoc,
            queQuan: `${rowData?.queQuan?.tenTinh || ''} - ${rowData?.queQuan?.tenHuyen || ''}`,
          })),
        }));
      }
    } catch (error) {}
  };

  useEffect(() => {
    getListSinhVien();
  }, [selectedRow]);

  useEffect(() => {
    getListOptions();
  }, []);

  useEffect(() => {
    getAll();
  }, [value?.hocKy]);

  return (
    <PageContainer title="Trang chủ" description="">
      <DashboardCard title="Thống kê">
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={tab}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChangeTab}>
                <Tab label="Thông tin học phí" value="1" />
                <Tab label="Thông tin sinh viên" value="2" />
              </TabList>
            </Box>
            <Box sx={{ maxWidth: 300, paddingLeft: '24px', marginTop: '15px' }}>
              <Autocomplete
                fullWidth
                variant="standard"
                id="combo-box-demo"
                options={value?.listHocKy || []}
                value={value?.hocKy}
                getOptionLabel={(option) => `${option.tenHocKy}${option.namHoc ? ` - ${option.namHoc}` : ''}`}
                noOptionsText="Không có bản ghi nào"
                onChange={(e, value) => handleChange(value, 'hocKy')}
                renderInput={(params) => (
                  <TextField {...params} label="Học kỳ" variant="standard" />
                )}
              />
            </Box>
            <TabPanel value="1">
              <Grid container spacing={2} style={{ marginBottom: 5 }}>
                <Grid item lg={12} sm={12} md={12}>
                  <MaterialTable
                    title={
                      value?.hocKy?.tenHocKy
                        ? `Học phí trong HK ${value?.hocKy?.tenHocKy}${value?.hocKy?.namHoc ? ` - ${value?.hocKy?.namHoc}` : ''}`
                        : 'Học phí'
                    }
                    columns={[
                      {
                        title: 'Sinh viên',
                        field: 'sinhVien',
                      },
                      {
                        title: 'Ngày lập phiếu',
                        field: 'ngayLapPhieuThuHp',
                      },
                      {
                        title: 'Số tiền còn lại',
                        field: 'soTienConLai',
                      },
                      {
                        title: 'Số tiền đăng ký',
                        field: 'soTienDk',
                      },
                      {
                        title: 'Số tiền đã đóng',
                        field: 'soTienDong',
                      },
                    ]}
                    data={listItems}
                    options={{ ...tableOtion.options, maxBodyHeight: '200px', exportButton:{csv: true}}}
                    localization={tableOtion.localization}
                    onRowClick={(e, rowData) => {
                      setSelectedRow(rowData);
                    }}
                  />
                </Grid>
              </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={2} style={{ marginBottom: 5 }}>
                <Grid item lg={12} sm={12} md={12}>
                  <MaterialTable
                    title={
                      value?.hocKy?.tenHocKy
                        ? `Danh sách các lớp học có trong học kỳ ${value?.hocKy?.tenHocKy}`
                        : 'Danh sách các lớp học'
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
                      { title: 'Tên lớp', field: 'tenLop' },
                      { title: 'Sĩ số hiện tại', field: 'siSoHienTai' },
                      { title: 'Sĩ số tối đa', field: 'siSoToiDa' },
                    ]}
                    data={value?.listLopHoc}
                    options={{ ...tableOtion.options, maxBodyHeight: '200px' }}
                    localization={tableOtion.localization}
                    onRowClick={(e, rowData) => {
                      setSelectedRow(rowData);
                    }}
                  />
                </Grid>
                <Grid item lg={12} sm={12} md={12}>
                  <MaterialTable
                    title={
                      selectedRow
                        ? `Danh sách sinh viên có trong ${selectedRow?.tenLop}`
                        : 'Danh sách sinh viên'
                    }
                    columns={[
                      { title: 'Sinh viên', field: 'hoTen' },
                      {
                        title: 'Ngày sinh',
                        field: 'ngaySinh',
                      },
                      {
                        title: 'Chuyên ngành',
                        field: 'nganhHoc',
                      },
                      {
                        title: 'Quê quán',
                        field: 'queQuan',
                      },
                    ]}
                    data={value?.listSinhVien}
                    options={{ ...tableOtion.options, maxBodyHeight: '200px', exportButton:{csv: true, pdf: false}}}
                    localization={tableOtion.localization}
                  />
                </Grid>
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </DashboardCard>
    </PageContainer>
  );
};

export default ThongKe;
