import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Grid, Box, Card, Stack, Typography } from '@mui/material';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from './auth/AuthLogin';
import { code, role } from 'src/const';
import { login } from '../tai-khoan/TaiKhoanServices';
import { toast } from 'react-toastify';

const Login2 = () => {
  const [item, setItem] = useState({ role: role[0] });
  let navigate = useNavigate();

  const handleLogin = async () => {
    let payload = {
      tenTaiKhoan: item?.tenTaiKhoan,
      matKhau: item?.matKhau,
    };
    try {
      const data = await login(payload);
      if (data?.status === code.success) {
        sessionStorage.setItem('user', JSON.stringify(data?.data));
        toast.success('Đăng nhập thành công!');
        if (data?.data?.vaiTro === role[1]) {
          navigate('/dang-ky-hoc-phan');
        } else {
          navigate('/');
        }
      }
    } catch (error) {
      toast.error(error?.response?.data || 'Sai tên tài khoản hoặc mật khẩu!');
    }
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setItem((pre) => ({ ...pre, [name]: value }));
  };

  return (
    <PageContainer title="Đăng nhập" description="this is Login page">
      <Box
        sx={{
          position: 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Logo />
              </Box>
              <AuthLogin item={item} onLogin={handleLogin} onChangeInput={handleChange} />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  );
};

export default Login2;
