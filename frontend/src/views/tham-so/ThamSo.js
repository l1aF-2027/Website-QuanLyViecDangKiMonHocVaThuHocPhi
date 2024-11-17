import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
import { Box } from '@mui/material';
import { BorderColorSharp } from '@mui/icons-material';
import ThamSoDialog from './ThamSoDialog';
import { deleteThamSo, getAllThamSo } from './ThamSoServices';
import { code, formatCost } from 'src/const';
import ConfirmDialog from 'src/components/dialog/ConfirmDialog';
import { toast } from 'react-toastify';

const ThamSo = () => {
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

  const handleOke = async () => {
    try {
      await deleteThamSo(item?.id);
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
      const data = await getAllThamSo();
      if (data?.status === code.success) {
        setlistItems(data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <PageContainer title="Tham số" description="">
      <DashboardCard title="Danh sách tham số">
        <MaterialTable
          title={ ''}
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
                    {/* <div onClick={() => handleDelete(rowData)}>
                      <Delete fontSize="small" sx={{ color: 'error.main' }} />
                    </div> */}
                  </Box>
                );
              },
            },
            {
              title: 'Tiền học mỗi tín chỉ lý thuyết',
              field: 'tienHocMoiTinChiLyThuyet',
              render: (rowData) => formatCost(rowData.tienHocMoiTinChiLyThuyet),
            },
            {
              title: 'Tiền học mỗi tín chỉ thực hành',
              field: 'tienHocMoiTinChiThucHanh',
              render: (rowData) => formatCost(rowData.tienHocMoiTinChiThucHanh),
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
        <ThamSoDialog open={open} handleClose={handleClose} item={item} updateData={getAll} />
      )}
      {openDelete && (
        <ConfirmDialog open={openDelete} handleClose={handleClose} handleOke={handleOke} />
      )}
    </PageContainer>
  );
};

export default ThamSo;
