"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import MenuElement from "./MenuElement";
import MenuContainer from "./MenuContainer";
import LogoTitle from "./LogoTitle";
import RegisterModal from "../modal/RegisterModal";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div
        className="
       py-2
       border-b-[1px]"
      >
        <Container>
          <div
            className="
          flex
          flex-row
          items-center
          justify-between
          gap-3
          md:gap-0"
          >
            <div
              className="
          flex
          flex-row
          items-center
          justify-between
          gap-2"
            >
              <Logo />
              <LogoTitle>KONAK KÜLTÜR SANAT AKADEMİSİ</LogoTitle>
            </div>
            <MenuContainer>
              <MenuElement address="/" displayName="Anasayfa" />
              <MenuElement address="/sanatçılar" displayName="Sanatçılar" />
              <MenuElement address="/hakkında" displayName="Hakkında" />
              <MenuElement address="/kaydol" displayName="About" />
              <MenuElement address="/girişyap" displayName="Giriş Yap" />
            </MenuContainer>
            <UserMenu />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
