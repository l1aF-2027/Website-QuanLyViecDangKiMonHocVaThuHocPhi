import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
import { Box, Button } from '@mui/material';
import { BorderColorSharp, Delete } from '@mui/icons-material';
import TaiKhoanDialog from './TaiKhoanDialog';
import { deleteTaiKhoan, getAllTaiKhoan } from './TaiKhoanServices';
import { code } from 'src/const';
import ConfirmDialog from 'src/components/dialog/ConfirmDialog';
import { toast } from 'react-toastify';

const TaiKhoan = () => {
  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [item, setItem] = React.useState(null);
  const [listItems, setlistItems] = React.useState([]);

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
      await deleteTaiKhoan(item?.idTk);
      toast.success('Xóa thành công.');
    } catch (error) {
      toast.error('Có lỗi xảy ra.');
    } finally {
      handleClose();
      getAll();
    }
  };
  const getAll = async () => {
    try {
      const data = await getAllTaiKhoan();
      if (data?.status === code.success) {
        setlistItems(data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <PageContainer title="Tài khoản" description="">
      <DashboardCard title="Danh sách tài khoản">
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
            { title: 'Tên tài khoản', field: 'tenTaiKhoan' },
            {
              title: 'Sinh viên',
              field: 'sinhVien',
              render: (rowData) => rowData?.sinhVien?.hoTen,
            },
            { title: 'Vai trò', field: 'vaiTro' },
          ]}
          data={listItems}
          options={tableOtion.options}
          localization={tableOtion.localization}
        />
      </DashboardCard>
      {open && (
        <TaiKhoanDialog open={open} handleClose={handleClose} item={item} updateData={getAll} />
      )}
      {openDelete && (
        <ConfirmDialog open={openDelete} handleClose={handleClose} handleOke={handleOke} />
      )}
    </PageContainer>
  );
};

export default TaiKhoan;
