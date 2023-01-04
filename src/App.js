import axios from "axios";
import React, { useMemo,useEffect, useState } from "react";
import {Routes, Route, useParams, Link, BrowserRouter} from "react-router-dom"
import Header from "./componens/UI/Header/Header";
import Home from "./componens/UI/Home/home";
import Login from "./http/Login"
import Registration from "./http/Registration"
import MyFiles from "./http/myFiles";


function App() {


  return (
        <BrowserRouter>
      <Header>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="registration" element={<Registration />} />
          <Route path="myfiles" element={<MyFiles />} />

          </Routes>
      </Header>
      </BrowserRouter>
      
  );
}

export default App