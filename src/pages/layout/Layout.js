import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Footer from './footer/Footer';
import S from '../layout/style';

const Layout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isIntroPage = location.pathname === '/';
  const isLoggedIn = !!localStorage.getItem('accessToken');

  const [keyword, setKeyword] = useState('');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('email');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  const handleSearch = () => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword.trim())}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  return (
    <div>
      <S.Background>
        {!isIntroPage && (
          <>
            <S.HeaderWrap>
              <S.LogoWrap>
                <img src="/logo/logo2.png" alt="logo" />
                <p>Purgo</p>
              </S.LogoWrap>

              <S.SearchBox>
                <S.SearchInput
                  placeholder="검색어를 입력하세요"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyDown={handleKeyPress}
                />
                <p onClick={handleSearch} style={{ cursor: 'pointer' }}>검색</p>
              </S.SearchBox>

              {isLoggedIn ? (
                <S.LoginButton onClick={handleLogout}>로그아웃</S.LoginButton>
              ) : (
                <S.LoginButton onClick={() => navigate('/login')}>로그인</S.LoginButton>
              )}
            </S.HeaderWrap>
            <S.Topbar />
          </>
        )}
        <S.Main>
          <Outlet />
        </S.Main>
      </S.Background>
      {!isIntroPage && <Footer />}
    </div>
  );
};

export default Layout;
