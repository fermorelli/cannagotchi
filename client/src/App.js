import { AddUser } from './components/adduser/AddUser';
import { EditUser } from './components/edituser/EditUser';
import { UserList } from './components/userlist/UserList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/nav/nav';
import { LogIn } from './components/login/LogIn';
import { SignUp } from './components/signup/SignUp';

function App() {
  return (
    <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
        <Nav />
          <Routes>
            <Route path='/login' element={<LogIn />} exact></Route>
            <Route path='/signup' element={<SignUp />} exact></Route>
            <Route path='/users' element={<UserList />} exact></Route>
            <Route path='/add-user' element={<AddUser />} exact></Route>
            <Route path='/edit-user/:id' element={<EditUser />} exact></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
