import React, { useState } from "react";
import styled from "styled-components";
import LogoImage from '/images/logo.png';
import AuthVideo from "/plant/lives.mp4";  // Renamed for clarity
import SignIn from "./Login.jsx";  // Corrected component name
import SignUp from "./Register.jsx";  // Corrected component name
import SideImage from "/images/rig.png";  // Renamed for clarity

const Container = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  background: ${({ theme }) => theme.bg};
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Left = styled.div`
  flex: 1;
  position: relative;
  width: 100vw;
  @media (max-width: 700px) {
    display: none;
  }
     box-shadow: 15px 0px 30px rgba(0, 0, 0, 0.5);

`;

const Logo = styled.img`
  position: absolute;
  width: 70px;
  top: 40px;
  left: 60px;
  z-index: 10;
`;

const Video = styled.video`
  position: relative;
  height: 100%;
  width: 100%;
  object-fit: cover;
  border-radius: 0%;
 box-shadow: 15px 0px 30px rgba(0, 0, 0, 0.5);/* Soft, blurred shadow */
`;

const Side = styled.img`
  position: absolute;
  height: 60%;
  width: 35%;
  z-index: 2;
  top: -18px;
  right: -40px;
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 10px;
  align-items: center;
  justify-content: center;
  background-color: white;
  
`;

const Text = styled.div`
  font-size: 16px;
  text-align: start;
  color: ${({ theme }) => theme.text_secondary};
  margin-top: 16px;
  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

const TextButton = styled.span`
  color: ${({ theme }) => theme.primary};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
`;

const Authentication = () => {
  const [login, setLogin] = useState(false);

  return (
    <Container>
      <Left>
        {/* <Logo src={LogoImage} alt="Logo" /> */}
        <Video src={AuthVideo} autoPlay loop muted />
      </Left>
      <Right>
        <Side src={SideImage} alt="Side Decoration" />
        {login ? (
          <>
            <SignUp />
            <Text>
            Already have an account?{" "}
              <TextButton onClick={() => setLogin(false)}>Sign In</TextButton>
            </Text>
          </>
        ) : (
          <>
            <SignIn />
            <Text>
            Don't have an account?{" "}
              <TextButton onClick={() => setLogin(true)}>Sign Up</TextButton>
            </Text>
          </>
        )}
      </Right>
    </Container>
  );
};

export default Authentication;
