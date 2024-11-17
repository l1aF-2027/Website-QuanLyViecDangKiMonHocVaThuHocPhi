import React, { useEffect, useState, useCallback } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
import { Box, Autocomplete, TextField } from '@mui/material';
import { BorderColorSharp, Check } from '@mui/icons-material';
import { getAllThuHocPhi, createThuHocPhi } from './ThuHocPhiServices';
import { toast } from 'react-toastify';
import { code, convertDate, formatCost } from 'src/const';
import { getAllSinhVien, getTotalTuitionByStudentId } from '../sinh-vien/SinhVienServices';
import { getAllHocKy } from '../hoc-ky/HocKyServices';
import ThuHocPhiDialog from './ThuHocPhiDialog';

const ThuHocPhi = () => {
  const [listItems, setListItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState(null);
  const [listHocKy, setListHocKy] = useState([]);
  const [selectedHocKy, setSelectedHocKy] = useState(null);
  const [ngayThiCuoiKy, setNgayThiCuoiKy] = useState('');
  const [showData, setShowData] = useState(false);

  const getSoTienDangKy = async (sinhVienId, hocKyId) => {
    try {
      const res = await getTotalTuitionByStudentId(sinhVienId, hocKyId);
      if (res?.status === code.success) {
        return res.data.finalTuition;
      }
    } catch (error) {
      console.error("Error fetching tuition:", error);
    }
    return 0;
  };

  const updateSoTienDangKy = async (items, selectedHocKyId) => {
    const updatedItems = await Promise.all(
      items.map(async (item) => {
        const soTienDk = await getSoTienDangKy(item.sinhVien.idSinhVien, selectedHocKyId);
        return {
          ...item,
          soTienDk,
          soTienConLai: soTienDk - item.soTienDong
        };
      })
    );
    return updatedItems;
  };

  const getAll = async () => {
    setIsLoading(true);
    try {
      const [sinhVienData, hocKyData, thuHocPhiData] = await Promise.all([
        getAllSinhVien(),
        getAllHocKy(),
        getAllThuHocPhi()
      ]);
  
      if (sinhVienData?.status === code.success && hocKyData?.status === code.success) {
        const sinhViens = sinhVienData.data;
        const hocKys = hocKyData.data;
        setListHocKy(hocKys);
        const existingThuHocPhi = thuHocPhiData?.status === code.success ? thuHocPhiData.data : [];
  
        const updatedListItems = await Promise.all(
          hocKys.flatMap(hocKy =>
            sinhViens.map(async sinhVien => {
              const existingItem = existingThuHocPhi.find(
                item => item.sinhVien.idSinhVien === sinhVien.idSinhVien && item.hocKy.idHocKy === hocKy.idHocKy
              );
  
              if (existingItem) {
                return existingItem;
              }
  
              const soTienDk = await getSoTienDangKy(sinhVien.idSinhVien, hocKy.idHocKy);
              
              if (soTienDk > 0) {
                const newItem = {
                  sinhVien,
                  hocKy,
                  soTienDk,
                  soTienDong: 0,
                  soTienConLai: soTienDk,
                  ngayLapPhieuThuHp: new Date()
                };
  
                try {
                  const payload = {
                    idSinhVien: sinhVien.idSinhVien,
                    idHocKy: hocKy.idHocKy,
                    soTienDk: soTienDk,
                    soTienDong: 0,
                    soTienConLai: soTienDk,
                    ngayLapPhieuThuHp: convertDate(new Date())
                  };
                  const response = await createThuHocPhi(payload);
                  if (response.status === code.success) {
                    console.log('Đã thêm mới dữ liệu thu học phí tự động');
                    return response.data;
                  }
                } catch (error) {
                  console.error("Lỗi khi tự động thêm dữ liệu:", error);
                }
  
                return newItem;
              }
              
              return null;
            })
          )
        );
  
        const filteredUpdatedListItems = updatedListItems.filter(item => item !== null);
        setListItems(filteredUpdatedListItems);
        if (selectedHocKy) {
          const filtered = filteredUpdatedListItems.filter(item => item.hocKy.idHocKy === selectedHocKy.idHocKy);
          setFilteredItems(filtered);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error('Có lỗi xảy ra khi tải dữ liệu');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (rowData = {}) => {
    setItem(rowData);
    setOpen(true);
  };

  const handleClose = useCallback(async () => {
    setOpen(false);
    setItem(null);
    if (selectedHocKy) {
      await refreshCurrentHocKyData();
    }
  }, [selectedHocKy]);

  const refreshCurrentHocKyData = async () => {
    if (selectedHocKy) {
      setIsLoading(true);
      try {
        const allData = await getAllThuHocPhi();
        if (allData?.status === code.success) {
          const filteredData = allData.data.filter(item => item.hocKy.idHocKy === selectedHocKy.idHocKy);
          const updatedData = await updateSoTienDangKy(filteredData, selectedHocKy.idHocKy);
          setFilteredItems(updatedData);
        }
      } catch (error) {
        console.error("Error refreshing data:", error);
        toast.error('Có lỗi xảy ra khi cập nhật dữ liệu');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlCheckDateValid = async (rowData) => {
    try {
      const ngayLapPhieuThuHP = new Date(); 
      const ngayKiemTra = new Date(ngayThiCuoiKy);
      const soTienConLai = rowData.soTienConLai;
      const hocKy = rowData.hocKy
      if (soTienConLai <= 0) {
        toast.success('Thí sinh đủ điều kiện tham gia thi cuối kỳ trong học kỳ ' + hocKy.tenHocKy + '-' + hocKy.namHoc);
      } 
      else if (ngayLapPhieuThuHP < ngayKiemTra && soTienConLai !== 0)
      {
        toast.info('Thí sinh chưa đủ điều kiện tham gia thi cuối kỳ trong học kỳ ' + hocKy.tenHocKy + '-' + hocKy.namHoc)
      }
      else
      {
        toast.error('Thí sinh không đủ điều kiện tham gia thi cuối kỳ trong học kỳ này ' + hocKy.tenHocKy + '-' + hocKy.namHoc);
      }
    } catch (error) {
      console.error("Error checking date:", error);
      toast.error('Có lỗi đã xảy ra.');
    }
  };

  const handleHocKyChange = async (event, value) => {
    setSelectedHocKy(value);
    if (value) {
      setIsLoading(true);
      try {
        const filtered = listItems.filter(item => item.hocKy.idHocKy === value.idHocKy);
        const updatedFiltered = await updateSoTienDangKy(filtered, value.idHocKy);
        setFilteredItems(updatedFiltered);
        setShowData(true);
      } catch (error) {
        console.error("Error updating tuition data:", error);
        toast.error('Có lỗi xảy ra khi cập nhật số tiền đăng ký');
      } finally {
        setIsLoading(false);
      }
    } else {
      setFilteredItems([]);
      setShowData(false);
    }
  };

  useEffect(() => {
    getAll();
  }, []);

  return (
    <PageContainer title="Học phí" description="">
      <DashboardCard title="Danh sách học phí">
        <Box sx={{ display: 'flex', gap: 2, paddingLeft: '24px', marginTop: '15px', marginBottom: '15px' }}>
          <Autocomplete
            sx={{ width: 300 }}
            variant="standard"
            id="combo-box-demo"
            options={listHocKy || []}
            value={selectedHocKy}
            getOptionLabel={(option) => `${option.tenHocKy}${option.namHoc ? ` - ${option.namHoc}` : ''}`}
            noOptionsText="Không có bản ghi nào"
            onChange={handleHocKyChange}
            renderInput={(params) => (
              <TextField {...params} label="Học kỳ" variant="standard" />
            )}
          />
          <TextField
            label="Ngày thi cuối kỳ"
            type="date"
            value={ngayThiCuoiKy}
            onChange={(e) => setNgayThiCuoiKy(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            sx={{ width: 200 }}
          />
        </Box>
        <MaterialTable
          title={''}
          columns={[
            {
              title: 'Thao tác',
              field: '',
              render: (rowData) => (
                <Box sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}>
                  <div onClick={() => handleEdit(rowData)}>
                    <BorderColorSharp fontSize="small" sx={{ color: 'primary.main' }} />
                  </div>
                  <div onClick={() => handlCheckDateValid(rowData)}>
                    <Check fontSize="small" sx={{ color: 'success.main' }} />
                  </div>
                </Box>
              ),
            },
            {
              title: 'Ngày lập phiếu thu',
              field: 'ngayLapPhieuThuHp',
              render: (rowData) => convertDate(rowData?.ngayLapPhieuThuHp, true),
            },
            {
              title: 'Sinh viên',
              field: 'sinhVien',
              render: (rowData) => rowData?.sinhVien?.hoTen,
            },
            {
              title: 'Học kỳ',
              field: 'hocKy',
              render: (rowData) => {
                const hocky = rowData?.hocKy;
                if (!hocky) return '';
                return `${hocky.tenHocKy}${hocky.namHoc ? ` - ${hocky.namHoc}` : ''}`;
              },
            },
            {
              title: 'Số tiền đăng ký',
              field: 'soTienDk',
              render: (rowData) => formatCost(rowData?.soTienDk),
            },
            {
              title: 'Số tiền đóng',
              field: 'soTienDong',
              render: (rowData) => formatCost(rowData?.soTienDong),
            },
            {
              title: 'Số tiền còn lại',
              field: 'soTienConLai',
              render: (rowData) => formatCost(rowData?.soTienConLai),
            },
          ]}
          data={showData ? filteredItems : []}
          options={{
            ...tableOtion.options,
            search: false,
            isLoading: isLoading,
            emptyRowsWhenPaging: false,
            showEmptyDataSourceMessage: !showData || filteredItems.length === 0,
          }}
          localization={{
            ...tableOtion.localization,
            emptyDataSourceMessage: showData 
              ? 'Không có bản ghi nào' 
              : 'Vui lòng chọn học kỳ để xem dữ liệu',
          }}
        />
      </DashboardCard>
      {open && (
        <ThuHocPhiDialog open={open} handleClose={handleClose} item={item} updateData={refreshCurrentHocKyData} />
      )}
    </PageContainer>
  );
};

export default ThuHocPhi;