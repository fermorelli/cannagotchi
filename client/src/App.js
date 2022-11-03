import { AddUser } from './components/addUser/AddUser';
import { EditUser } from './components/editUser.jsx/EditUser';
import { UserList } from './components/userList/UserList';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Nav } from './components/nav/nav';

function App() {
  return (
    <div className="App">
        <Router basename={process.env.PUBLIC_URL}>
        <Nav />
          <Routes>
            <Route path='/users' element={<UserList />} exact></Route>
            <Route path='/add-user' element={<AddUser />} exact></Route>
            <Route path='/edit-user/:id' element={<EditUser />} exact></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
