import React from 'react';
import {
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  Stack,
  Checkbox,
} from '@mui/material';
import { Link } from 'react-router-dom';

import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';

const AuthLogin = ({ title, subtitle, subtext, onLogin, item, onChangeInput }) => (
  <>
    {title ? (
      <Typography fontWeight="700" variant="h2" mb={1}>
        {title}
      </Typography>
    ) : null}

    {subtext}

    <Stack>
      <Box>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="tenTaiKhoan"
          mb="5px"
        >
          Tên đăng nhập
        </Typography>
        <CustomTextField
          id="tenTaiKhoan"
          name="tenTaiKhoan"
          variant="outlined"
          fullWidth
          onChange={onChangeInput}
          value={item?.tenTaiKhoan}
        />
      </Box>
      <Box mt="25px" sx={{ marginBottom: 2 }}>
        <Typography
          variant="subtitle1"
          fontWeight={600}
          component="label"
          htmlFor="matKhau"
          mb="5px"
        >
          Mật khẩu
        </Typography>
        <CustomTextField
          id="matKhau"
          type="password"
          name="matKhau"
          variant="outlined"
          fullWidth
          onChange={onChangeInput}
          value={item?.matKhau}
        />
      </Box>
      {/* <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                <FormGroup>
                    <FormControlLabel
                        control={<Checkbox defaultChecked />}
                        label="Remeber this Device"
                    />
                </FormGroup>
                <Typography
                    component={Link}
                    to="/"
                    fontWeight="500"
                    sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                    }}
                >
                    Forgot Password ?
                </Typography>
            </Stack> */}
    </Stack>
    <Box>
      <Button
        color="primary"
        variant="contained"
        size="large"
        fullWidth
        // component={Link}
        // to="/"
        // type="submit"
        onClick={onLogin}
      >
        Đăng nhập
      </Button>
    </Box>
    {subtitle}
  </>
);

export default AuthLogin;
