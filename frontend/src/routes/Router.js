import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import { role } from 'src/const';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Khoa = Loadable(lazy(() => import('../views/khoa/Khoa')));
const LoaiMon = Loadable(lazy(() => import('../views/loai-mon-hoc/LoaiMonHoc')));
const HocKy = Loadable(lazy(() => import('../views/hoc-ky/HocKy')));
const DoiTuong = Loadable(lazy(() => import('../views/doi-tuong/DoiTuong')));
const QueQuan = Loadable(lazy(() => import('../views/que-quan/QueQuan')));
const ThamSo = Loadable(lazy(() => import('../views/tham-so/ThamSo')));
const NganhHoc = Loadable(lazy(() => import('../views/nganh-hoc/NganhHoc')));
const MonHoc = Loadable(lazy(() => import('../views/mon-hoc/MonHoc')));
const TaiKhoan = Loadable(lazy(() => import('../views/tai-khoan/TaiKhoan')));
const SinhVien = Loadable(lazy(() => import('../views/sinh-vien/SinhVien')));
const ChuongTrinhHoc = Loadable(lazy(() => import('../views/chuong-trinh-hoc/ChuongTrinhHoc')));
const LopHoc = Loadable(lazy(() => import('../views/lop-hoc/LopHoc')));
const ThuHocPhi = Loadable(lazy(() => import('../views/thu-hoc-phi/ThuHocPhi')));
const DangKy = Loadable(lazy(() => import('../views/dang-ky/DangKy')));
const DangKyHocPhan = Loadable(lazy(() => import('../views/dang-ky-hoc-phan/DangKyHocPhan')));
const ThongKe = Loadable(lazy(() => import('../views/thong-ke/ThongKe')));
const Icons = Loadable(lazy(() => import('../views/icons/Icons')));
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')));
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to={'/thong-ke'} /> },
      { path: '/khoa', exact: true, element: <Khoa /> },
      { path: '/loai-mon', exact: true, element: <LoaiMon /> },
      { path: '/hoc-ky', exact: true, element: <HocKy /> },
      { path: '/doi-tuong', exact: true, element: <DoiTuong /> },
      { path: '/que-quan', exact: true, element: <QueQuan /> },
      { path: '/tham-so', exact: true, element: <ThamSo /> },
      { path: '/nganh-hoc', exact: true, element: <NganhHoc /> },
      { path: '/mon-hoc', exact: true, element: <MonHoc /> },
      { path: '/tai-khoan', exact: true, element: <TaiKhoan /> },
      { path: '/sinh-vien', exact: true, element: <SinhVien /> },
      { path: '/chuong-trinh-hoc', exact: true, element: <ChuongTrinhHoc /> },
      { path: '/lop-hoc', exact: true, element: <LopHoc /> },
      { path: '/thu-hoc-phi', exact: true, element: <ThuHocPhi /> },
      { path: '/dang-ky', exact: true, element: <DangKy /> },
      { path: '/dang-ky-hoc-phan', exact: true, element: <DangKyHocPhan /> },
      { path: '/thong-ke', exact: true, element: <ThongKe /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
