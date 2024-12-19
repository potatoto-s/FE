import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Community from './pages/community/Community';
import CommunityDetail from './pages/community/CommunityDetail';
import Contact from './pages/contact/Contact';
import MyPage from './pages/mypage/MyPage';
import MypageEditor from './pages/mypage/MyPageEditor';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import CommunityPost from './pages/community/CommunityPost';

const App = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/community" element={<Community />} />
        <Route path="/communitypost" element={<CommunityPost />} />
        <Route path="/communitydetail" element={<CommunityDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/mypageeditor" element={<MypageEditor />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
