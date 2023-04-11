"use client";
import React from "react";
import Container from "../Container";
import Logo from "./Logo";
import MenuElement from "./MenuElement";
import MenuContainer from "./MenuContainer";
import LogoTitle from "./LogoTitle";

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
              <MenuElement address="/artists" displayName="Sanatçılar" />
              <MenuElement address="/about" displayName="Hakkında" />
            </MenuContainer>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
