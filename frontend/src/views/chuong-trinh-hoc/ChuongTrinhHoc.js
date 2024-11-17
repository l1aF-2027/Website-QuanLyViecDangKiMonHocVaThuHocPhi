import React, { useEffect } from 'react';
import PageContainer from 'src/components/container/PageContainer';
import DashboardCard from '../../components/shared/DashboardCard';
import MaterialTable from 'material-table';
import { tableOtion } from '../utilities/TableOption';
import { Box, Button } from '@mui/material';
import { BorderColorSharp, Delete } from '@mui/icons-material';
import ChuongTrinhHocDialog from './ChuongTrinhHocDialog';
import { deleteChuongTrinhHoc, getAllChuongTrinhHoc } from './ChuongTrinhHocServices';
import { code } from 'src/const';
import ConfirmDialog from 'src/components/dialog/ConfirmDialog';
import { toast } from 'react-toastify';

const ChuongTrinhHoc = () => {
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
      await deleteChuongTrinhHoc(item?.idChuongTrinhHoc);
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
      const data = await getAllChuongTrinhHoc();
      if (data?.status === code.success) {
        setlistItems(data?.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <PageContainer title="Chương trình học" description="">
      <DashboardCard title="Danh sách chương trình học">
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
              title: 'Mã chương trình học',
              field: 'chuongTrinhHoc',
              render: (rowData) => rowData.idChuongTrinhHoc,
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
              title: 'Môn học',
              field: 'monHoc',
              render: (rowData) => {
                const monHoc = rowData?.monHoc;
                if (!monHoc) return '';
                return `${monHoc.tenMonHoc}${monHoc?.loaiMon?.tenLoaiMon ? ` - ${monHoc?.loaiMon?.tenLoaiMon}` : ''}`;
              },
            },
            {
              title: 'Ngành học',
              field: 'nganhHoc',
              render: (rowData) => rowData?.nganhHoc?.tenNganhHoc,
            },
            { title: 'Ghi chú', field: 'ghiChu' },
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
        <ChuongTrinhHocDialog
          open={open}
          handleClose={handleClose}
          item={item}
          updateData={getAll}
        />
      )}
      {openDelete && (
        <ConfirmDialog open={openDelete} handleClose={handleClose} handleOke={handleOke} />
      )}
    </PageContainer>
  );
};

export default ChuongTrinhHoc;
