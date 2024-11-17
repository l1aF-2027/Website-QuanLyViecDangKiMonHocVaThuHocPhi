import { iconClasses } from '@mui/material';
import {
  IconAddressBook,
  IconAperture,
  IconScript,
  IconBoxPadding,
  IconBooks,
  IconBuildingBank,
  IconCash,
  IconCopy,
  IconHome2,
  IconSticker,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconNotebook,
  IconRegistered,
  IconSchool,
  IconTypography,
  IconUserPlus,
  IconUsers,
  IconUserSearch,
  IconVocabulary,
  IconChalkboard,
} from '@tabler/icons';

import { uniqueId } from 'lodash';
import { role } from 'src/const';

const Menuitems = () => {
  let isRoleStudent = JSON.parse(sessionStorage.getItem('user'))?.vaiTro === role[1];
  return [

    {
      id: uniqueId(),
      title: 'Trang chủ',
      hidden: isRoleStudent,
      icon: IconLayoutDashboard,
      href: '/thong-ke',
    },
    {
      navlabel: true,
      subheader: 'Danh mục',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Khoa',
      icon: IconHome2,
      href: '/khoa',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Loại môn học',
      icon: IconVocabulary,
      href: '/loai-mon',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Học kỳ',
      icon: IconNotebook,
      href: '/hoc-ky',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Đối tượng',
      icon: IconAperture,
      href: '/doi-tuong',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Quê quán',
      icon: IconAddressBook,
      href: '/que-quan',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Tham số',
      icon: IconBoxPadding,
      href: '/tham-so',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Ngành học',
      icon: IconSchool,
      href: '/nganh-hoc',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Môn học',
      icon: IconBooks,
      href: '/mon-hoc',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Tài khoản',
      icon: IconUserSearch,
      href: '/tai-khoan',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Sinh viên',
      icon: IconUsers,
      href: '/sinh-vien',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Chương trình học',
      icon: IconChalkboard,
      href: '/chuong-trinh-hoc',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Lớp học',
      icon: IconSticker,
      href: '/lop-hoc',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Học phí',
      icon: IconCash,
      href: '/thu-hoc-phi',
    },
    {
      id: uniqueId(),
      hidden: isRoleStudent,
      title: 'Đăng ký',
      icon: IconRegistered,
      href: '/dang-ky',
    },
    {
      id: uniqueId(),
      hidden: !isRoleStudent,
      title: 'Đăng ký học phần',
      icon: IconRegistered,
      href: '/dang-ky-hoc-phan',
    },
  ];
};

export default Menuitems;
