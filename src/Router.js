import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import { Home, About, Album } from "./views";
import NavBar from "./components/NavBar/NavBar";
import Login from "./views/Login/Login";
import ResetP from "./views/ResetP/ResetP";
import ForgotP from "./views/ForgotP/ForgotP";
import SeeAll from "./components/Cards/seeAll";
import Favorites from "./views/Favorites/Favorites";
import Store from "./views/Store/Store";
import Playlist from "./views/Playlist/Playlist";
import SingleAlbum from "./views/SingleAlbum/Album";
import MembershipOffer from "./views/Membership/Membership";
import Buy from "./views/Buy/Buy";
import Account from "./views/Account/Account";
import MyPlaylist from "./components/Cards/myPlaylist";

const Router = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="membership" element={<MembershipOffer />} />
          <Route path="store" element={<Store />} />
          <Route path="login" element={<Login />} />
          <Route path="reset-password" element={<ResetP />} />
          <Route path="forgot-password" element={<ForgotP />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="seeAll/:name" element={<SeeAll />} />
          <Route path="playlist" element={<Playlist />} />
          <Route path="myPlaylist" element={<MyPlaylist />} />
          <Route path="album" element={<SingleAlbum />} />
          <Route path="buy" element={<Buy />} />
        </Route>
        <Route index element={<LandingPage />} />
        <Route path="account" element={<Account/>}/>
      </Routes>
    </div>
  );
};

export default Router;
