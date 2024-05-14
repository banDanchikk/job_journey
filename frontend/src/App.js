import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Saved from './pages/Saved'
import Registration from './pages/Registration';
import UserAccount from './pages/UserAccount';
import EditUserInfo from './pages/EditUserInfo';
import Vacancies from './pages/Vacancies';
import Login from './pages/Login';
import EmployerAccount from './pages/EmployerAccount';
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Home/>} />
          <Route path="/home" element = {<Home/>} />
          <Route path="/categories" element = {<Categories/>} />
          <Route path="/saved" element = {<Saved/>} />
          <Route path="/registration" element = {<Registration/>} />
          <Route path="/account" element = {<UserAccount/>} />
          <Route path="/edituser" element = {<EditUserInfo/>} />
          <Route path="/login" element = {<Login/>} />
          <Route path="/vacancies" element = {<Vacancies/>} />
          <Route path="/empacc" element = {<EmployerAccount/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
