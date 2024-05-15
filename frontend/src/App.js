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
import CreateVacancie from './pages/CreateVacancie';
import ViewVacanciesEmpl from './pages/VievVacEmpl';
import ViewVacSearcher from './pages/VievVacSercher';

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
          <Route path="/crvac" element = {<CreateVacancie/>}/>
          <Route path="/vivaempl" element = {<ViewVacanciesEmpl/>}/>
          <Route path="/vivaserch" element = {<ViewVacSearcher/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
