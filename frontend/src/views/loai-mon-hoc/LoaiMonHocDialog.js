// import * as React from 'react';
// // eslint-disable-next-line
// import Button from '@mui/material/Button';
// // eslint-disable-next-line
// import TextField from '@mui/material/TextField';
// // eslint-disable-next-line
// import Dialog from '@mui/material/Dialog';
// // eslint-disable-next-line
// import DialogActions from '@mui/material/DialogActions';
// // eslint-disable-next-line
// import DialogContent from '@mui/material/DialogContent';
// // eslint-disable-next-line
// import DialogTitle from '@mui/material/DialogTitle';
// // eslint-disable-next-line
// import { createLoaiMonHoc, updateLoaiMonHoc } from './LoaiMonHocServices';
// // eslint-disable-next-line
// import { code } from 'src/const';
// // eslint-disable-next-line
// import { toast } from 'react-toastify';

// export default function LoaiMonHocDialog({ open, handleClose, item, updateData }) {
//   const [value, setValue] = React.useState(null);

//   const handleChange = (e) => {
//     let { name, value } = e.target;
//     setValue((pre) => ({ ...pre, [name]: value }));
//   };

//   React.useEffect(() => {
//     setValue({ ...item });
//   }, []);

//   let convertDataSubmit = (data) => {
//     return {
//       idLoaiMon: data?.idLoaiMon,
//       tenLoaiMon: data?.tenLoaiMon,
//     };
//   };

//   // const handleFormSubmit = async () => {
//   //   try {
//   //     let payload = convertDataSubmit(value);
//   //     if (value?.idLoaiMon) {
//   //       let data = await updateLoaiMonHoc(payload);
//   //       if (data?.status === code.success) {
//   //         toast.success('Cập nhật thành công.');
//   //       }
//   //     } else {
//   //       let data = await createLoaiMonHoc(payload);
//   //       if (data?.status === code.success) {
//   //         toast.success('Thêm mới thành công.');
//   //       }
//   //     }
//   //   } catch (error) {
//   //     toast.error('Có lỗi xảy ra.');
//   //   } finally {
//   //     handleClose();
//   //     updateData();
//   //   }
//   // };
//   // return (
//   //   <React.Fragment>
//   //     <Dialog
//   //       open={open}
//   //       onClose={handleClose}
//   //       maxWidth="sm"
//   //       fullWidth
//   //       PaperProps={{
//   //         component: 'form',
//   //         onSubmit: (event) => {
//   //           event.preventDefault();
//   //           handleFormSubmit();
//   //         },
//   //       }}
//   //     >
//   //       <DialogTitle>{value?.idLoaiMon ? 'Cập nhật' : 'Thêm mới'} loại môn học</DialogTitle>
//   //       <DialogContent>
//   //         <TextField
//   //           autoFocus
//   //           required
//   //           margin="dense"
//   //           name="tenLoaiMon"
//   //           label="Tên loại môn học"
//   //           value={value?.tenLoaiMon}
//   //           onChange={handleChange}
//   //           fullWidth
//   //           variant="standard"
//   //         />
//   //       </DialogContent>
//   //       <DialogActions>
//   //         <Button onClick={handleClose}>Hủy</Button>
//   //         <Button type="submit">Lưu</Button>
//   //       </DialogActions>
//   //     </Dialog>
//   //   </React.Fragment>
//   // );
// }
