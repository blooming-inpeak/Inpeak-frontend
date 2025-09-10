import { useLocation, useNavigate } from 'react-router-dom';
import { Divider, HeaderContainer, HeaderLeft, HeaderRight, Logo, MenuItem, MenuItems, NavBar } from './HeaderStyle';
import { Login } from '../../login/LoginButton';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userState } from '../../../store/auth/userState';
import { loginModalState } from '../../../store/loginModal/loginModalState';
import { LoginDropdown } from '../../loginDropdown/LoginDropdown';
import { LoginModal } from '../../login/LoginModal';

export const Header = ({ isState }: { isState: string }) => {
  const pathname = useLocation().pathname;
  const navigate = useNavigate();
  const user = useRecoilValue(userState);
  const isLoggedIn = !!user?.nickname;
  const [isLoginModalOpen, setLoginModalOpen] = useRecoilState(loginModalState);

  return (
    <HeaderContainer $isState={isState}>
      <NavBar>
        <HeaderRight>
          <Logo src="/images/Logo.svg" alt="logo" onClick={() => navigate('/')} />
          <MenuItems>
            <MenuItem
              style={{
                color: pathname === '/interview' ? '#0050D8' : 'black',
                borderBottom: pathname === '/interview' ? '2px solid #0050D8' : 'none',
              }}
              onClick={() => navigate('/interview')}
            >
              모의면접
            </MenuItem>
            <Divider />
            <MenuItem
              style={{
                color: pathname === '/history' ? '#0050D8' : 'black',
                borderBottom: pathname === '/history' ? '2px solid #0050D8' : 'none',
              }}
              onClick={() => navigate('/history')}
            >
              히스토리
            </MenuItem>
            <Divider />
          </MenuItems>
        </HeaderRight>
        <HeaderLeft>
          {isLoggedIn ? <LoginDropdown /> : <Login />}
          {isLoginModalOpen && <LoginModal setOpenLogin={setLoginModalOpen} />}
        </HeaderLeft>
      </NavBar>
    </HeaderContainer>
  );
};
