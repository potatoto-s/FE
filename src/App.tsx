import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Community from './pages/community/Community';
import CommunityDetail from './pages/community/CommunityDetail';
import Contact from './pages/contact/Contact';
import ContactForm from './pages/contact/ContactForm';
import Mypage from './pages/mypage/MyPage';
import MypageEditor from './pages/mypage/MyPageEditor';
import LogIn from './pages/login/LogIn';
import SignUp from './pages/signup/SignUp';
import CommunityPost from './pages/community/CommunityPost';
import Layout from './layout/Layout';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route path="/community" element={<Community />} />
        <Route path="/communitydetail" element={<CommunityDetail />} />
        <Route path="/communitypost" element={<CommunityPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypageeditor" element={<MypageEditor />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
    </Routes>
  );
};

export default App;
