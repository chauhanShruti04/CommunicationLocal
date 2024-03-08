import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login/Login';
import Register from './Register/Register';
import ManageUser from './Component/ManageUser/ManageUser';
import Welcome from './Component/Welcome';
import ManageDocument from './Component/ManageDocument/ManageDocument';
import GroupChat from './Component/GroupChat/GroupChat';
import { LogOut } from './Logout/Logout';
import { PrivateRoute } from './Common/PrivateRoute';



function App() {
  return (
    <div >
      <Router>
        <Routes>
          <Route path='/' element={<Login />} index />
          <Route exact path='/register' element={<Register />}></Route>
          <Route path='/' element={<PrivateRoute />} >
            <Route index path='dashboard' element={<Welcome />} />
            <Route path="groupchat" element={<GroupChat />} />
            <Route path='manageuser' element={<ManageUser />} />
            <Route path="managedocument" element={<ManageDocument />} />
            <Route path='logout' element={<LogOut />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
