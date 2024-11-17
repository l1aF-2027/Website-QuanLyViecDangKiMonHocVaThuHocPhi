import { Link } from 'react-router-dom';
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
  position: 'relative',
}));

const TextLogoStyled = styled('div')(() => ({
  position: 'absolute',
  top: 25,
  left: 50,
  fontWeight: 'bold',
  fontSize: 23,
  color: '#11142d',
}));

const Logo = () => {
  return (
    <LinkStyled to="/">
      <LogoDark height={70} />
      <TextLogoStyled>EduErrol</TextLogoStyled>
    </LinkStyled>
  );
};

export default Logo;
