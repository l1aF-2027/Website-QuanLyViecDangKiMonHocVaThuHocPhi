export const tableOtion = {
  localization: {
    body: {
      emptyDataSourceMessage: 'Không có bản ghi nào.',
      filterRow: {
        filterTooltip: 'Lọc',
      },
      addTooltip: 'Thêm',
      deleteTooltip: 'Xóa',
      editTooltip: 'Sửa',
      editRow: {
        deleteText: 'Bạn có chắc muốn xóa bản ghi này?',
        cancelTooltip: 'Hủy',
        saveTooltip: 'Lưu',
      },
    },
    header: {
      actions: 'Hành động',
    },
    pagination: {
      labelDisplayedRows: '{from}-{to} trong {count}', // Sửa đổi chuỗi này
      firstTooltip: 'Trang đầu',
      previousTooltip: 'Trang trước',
      nextTooltip: 'Trang tiếp',
      lastTooltip: 'Trang cuối',
      labelRowsSelect: '',
      labelRowsPerPage: 'Số hàng mỗi trang:', // Thêm dòng này
    },
    toolbar: {
      searchTooltip: 'Tìm kiếm',
      searchPlaceholder: 'Tìm kiếm',
      exportTitle: 'Xuất',
      exportAriaLabel: 'Xuất',
      exportCSVName: 'Xuất CSV',
    },
  },
  options: {
    rowStyle: (rowData) => ({
      backgroundColor: rowData.tableData.id % 2 === 1 ? '#EEE' : '#FFF',
    }),
    headerStyle: {
      backgroundColor: '#5D87FF',
      color: '#fff',
      paddingTop: 10,
      paddingBottom: 10,
    },
    maxBodyHeight: '600px',
    minBodyHeight: '200px',
  },
};
