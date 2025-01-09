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
import CategoryLayout from './layout/CategoryLayout';
import { LoginRoutes, PublicRoutes, WorkshopRoutes } from './layout/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Main />} />
        <Route element={<CategoryLayout />}>
          <Route path="/community" element={<Community />} />
          <Route path="/communitydetail/:id" element={<CommunityDetail />} />
        </Route>
        <Route element={<WorkshopRoutes />}>
          <Route
            path="/communitypost/:id"
            element={<CommunityPost type={'edit'} />}
          />
          <Route
            path="/communitypost"
            element={<CommunityPost type={'post'} />}
          />
        </Route>
        <Route path="/contact" element={<Contact />} />
        <Route path="/contactform" element={<ContactForm />} />
        <Route element={<LoginRoutes />}>
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/mypageeditor" element={<MypageEditor />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LogIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
