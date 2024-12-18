import './App.css';
import { Route, Routes } from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Community from './pages/community/Community';
import CommunityDetail from './pages/community/CommunityDetail';
import Contact from './pages/contact/Contact';
import Mypage from './pages/mypage/MyPage';
import MypageEditor from './pages/mypage/MyPageEditor';
import SingUp from './pages/singup/SingUp';
import SingUpForm from './pages/singup/SingUpForm';

const App = () => {
  return (
    <>
      <Header />
      <div>
        <h1>Hello?</h1>
      </div>
      <Routes>
        <Route path="/main" element={<Main />} />
        <Route path="/community" element={<Community />} />
        <Route path="/communityDetail" element={<CommunityDetail />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/mypageEditor" element={<MypageEditor />} />
        <Route path="/singUp" element={<SingUp />} />
        <Route path="/singUpForm" element={<SingUpForm />} />
      </Routes>
      <div>
        <Route path="/Footer" element={<Footer />} />
      </div>
    </>
  );
};

export default App;
