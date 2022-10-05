import { AddUser } from './components/addUser/AddUser';
import { EditUser } from './components/editUser.jsx/EditUser';
import { UserList } from './components/userList/UserList';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { Nav } from './components/nav/nav';

function App() {
  return (
    <div className="App">
      <Nav />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<UserList />} exact></Route>
          <Route path='/add-user' element={<AddUser />} exact></Route>
          <Route path='/edit-user' element={<EditUser />} exact></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
