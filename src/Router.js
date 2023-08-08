import React from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import { Home, About } from "./views";
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
import SignUp from "./views/SignUp/SignUp";
import LandingPage from "./components/LandingPage";
import Checkout from "./views/Checkout/Checkout";
import BeMember from "./views/Membership/beMember";
import SuccessPurchase from "./views/SuccessPurchase/SuccessPurchase";
import ErrorPurchase from "./views/errorPurchase/errorPurchase";
import Create from "./views/CreatePlaylist/Create";
import EditPlaylit from "./views/EditPlaylist/EditPlaylist";


const Router = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="memberships" element={<MembershipOffer />} />
          <Route path="memberships/beMember" element={<BeMember />} />
          <Route path="store" element={<Store />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="seeAll/:name" element={<SeeAll />} />
          <Route path="playlist/:id" element={<Playlist />} />
          <Route path="myPlaylist" element={<MyPlaylist />} />
          <Route path="create" element={<Create />} />
          <Route path="album/:id" element={<SingleAlbum />} />
          <Route path="buy" element={<Buy />} />
        </Route>
        <Route index element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="reset-password/:token" element={<ResetP />} />
        <Route path="account" element={<Account/>}/>
        <Route path="forgot-password" element={<ForgotP />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="success" element={<SuccessPurchase />} />
        <Route path="error" element={<ErrorPurchase />} />
        <Route path="editPlaylist/:id" element={<EditPlaylit />} />
      </Routes>
    </div>
  );
};

export default Router;
