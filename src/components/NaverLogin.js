import React, { useEffect } from 'react';

const NaverLogin = () => {
  useEffect(() => {
    const naverLogin = new window.naver.LoginWithNaverId({
      clientId: '네이버 클라이언트 ID',
      callbackUrl: 'http://localhost:3000/callback',
      isPopup: false,
      loginButton: { color: 'green', type: 3, height: 58 },
    });
    naverLogin.init();
  }, []);

  return <div id="naverIdLogin" />;
};

export default NaverLogin;