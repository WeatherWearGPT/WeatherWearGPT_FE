export const saveAdminInfo = () => {
    const adminData = {
        id: 'admin',
        email: 'admin@naver.com',
        password: 'asdf',
        cm: '123',
        kg: '123',
        sex: '여성',
    };

    // 로컬 스토리지에 저장
    localStorage.setItem('admin', JSON.stringify(adminData));
};

// 데이터를 가져오는 함수
export const getAdminInfo = () => {
    const adminInfo = localStorage.getItem('admin');
    if (adminInfo) {
        return JSON.parse(adminInfo);
    } else {
        return null;
    }
};