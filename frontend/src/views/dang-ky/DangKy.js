import React, { useEffect, useState } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
import { Box, Button } from '@mui/material';
import { BorderColorSharp, Delete } from '@mui/icons-material';
import DangKyDialog from './DangKyDialog';
import { deleteDangKy, getAllDangKy } from './DangKyServices';
import { getAllLopHoc, updateLopHoc } from '../lop-hoc/LopHocServices';
import { code } from 'src/const';
import ConfirmDialog from 'src/components/dialog/ConfirmDialog';
import { toast } from 'react-toastify';

const DangKy = () => {
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [item, setItem] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [allClasses, setAllClasses] = useState([]);

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
    setItem(null);
  };

  const handleEdit = (rowData = {}) => {
    setItem(rowData);
    setOpen(true);
  };

  const handleDelete = (rowData = {}) => {
    setItem(rowData);
    setOpenDelete(true);
  };

  const handleOke = async () => {
    try {
      await deleteDangKy(item?.soPhieuDk);
      const lopHoc = item?.lopHoc;
      if (lopHoc && lopHoc.siSoHienTai > 0) {
        const newSiSo = lopHoc.siSoHienTai - 1;
        try {
          await updateLopHoc(lopHoc.tenLop, lopHoc.idChuongTrinhHoc, lopHoc.siSoToiDa, newSiSo);
          toast.success('Xóa đăng ký thành công.');
        } catch (updateError) {
          toast.success('Xóa đăng ký thành công.');
        }
      } else {
        toast.success('Xóa đăng ký thành công.');
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      handleClose();
      getAll();
    }
  };

  const getAll = async () => {
    try {
      const data = await getAllDangKy();
      if (data?.status === code.success) {
        setListItems(data?.data);
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
    }
  };

  const getAllClasses = async () => {
    try {
      const data = await getAllLopHoc();
      if (data?.status === code.success) {
        setAllClasses(data?.data);
      }
    } catch (error) {
      console.error('Error fetching classes:', error);
    }
  };

  useEffect(() => {
    getAll();
    getAllClasses();
  }, []);

  return (
    <PageContainer title="Đăng ký" description="">
      <DashboardCard title="Danh sách đăng ký">
        <MaterialTable
          title={
            <Button onClick={() => handleEdit({})} size="small" variant="contained" color="primary">
              Thêm mới
            </Button>
          }
          columns={[
            {
              title: 'Thao tác',
              field: '',
              render: (rowData) => {
                return (
                  <Box sx={{ display: 'flex', gap: 1, cursor: 'pointer' }}>
                    <div onClick={() => handleEdit(rowData)}>
                      <BorderColorSharp fontSize="small" sx={{ color: 'primary.main' }} />
                    </div>
                    <div onClick={() => handleDelete(rowData)}>
                      <Delete fontSize="small" sx={{ color: 'error.main' }} />
                    </div>
                  </Box>
                );
              },
            },
            {
              title: 'Sinh viên',
              field: 'sinhVien',
              render: (rowData) => rowData?.sinhVien?.hoTen,
            },
            {
              title: 'Lớp học',
              field: 'lopHoc',
              render: (rowData) => {
                const lophoc = rowData?.lopHoc;
                if (!lophoc) return '';
                return `${lophoc.tenLop} ${lophoc?.chuongTrinhHoc?.hocKy.tenHocKy ? ` : Học kỳ ${lophoc?.chuongTrinhHoc?.hocKy.tenHocKy}` : ''} ${lophoc?.chuongTrinhHoc?.hocKy.namHoc ? ` - ${lophoc?.chuongTrinhHoc?.hocKy.namHoc}` : ''}`;
              },
            },
          ]}
          data={listItems}
          options={{
            ...tableOtion.options,
            search: false, 
          }}
          localization={tableOtion.localization}
        />
      </DashboardCard>
      {open && (
        <DangKyDialog 
          open={open} 
          handleClose={handleClose} 
          item={item} 
          updateData={getAll} 
          allClasses={allClasses}
        />
      )}
      {openDelete && (
        <ConfirmDialog open={openDelete} handleClose={handleClose} handleOke={handleOke} />
      )}
    </PageContainer>
  );
};

export default DangKy;