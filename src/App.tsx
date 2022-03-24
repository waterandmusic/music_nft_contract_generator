import React, { useState } from "react";
import styled from "styled-components";
import Contract from "./Contract";
import Diagram from "./Diagram";
import Questions from "./Questions";

const AppComponent = styled.div`
  margin: 0 auto;
`;

const Title = styled.h1`
  font-family: sans-serif;
  padding: 30px 40px;
  margin: 0;
  border-bottom: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: black;
  color: white;
  @media print {
    display: none;
  }
  @media screen and (max-width: 1000px) {
    flex-direction: column;
  }
  @media screen and (max-width: 600px) {
    padding: 20px;
    text-align: center;
  }
`;

const TitleTextContainer = styled.div`
  display: flex;
  @media screen and (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
  }
`;

const TitleText = styled.div`
  display: inline;
  @media screen and (max-width: 1000px) {
    display: block;
    margin-bottom: 10px;
  }
`;

const ArticleLink = styled.a`
  border: 2px solid white;
  padding: 8px 16px;
  margin-left: 40px;
  color: white;
  font-weight: 700;
  border-radius: 4px;
  text-decoration: none;
  font-size: 20px;
  transition: 0.5s;
  &:hover {
    color: black;
    background: white;
    transition: 0.3s;
  }
  @media screen and (max-width: 1000px) {
    margin-left: 0;
  }
`;

const LogoLink = styled.a`
  img {
    height: 65px;
  }
`;

const AppLayout = styled.div`
  display: flex;
`;

const Brick = styled.div`
  border-right: 1px solid black;
  @media print {
    border: none;
  }
`;

const Brick1 = styled(Brick)`
  @media print {
    display: none;
  }
  @media screen and (max-width: 1200px) {
    border-right: 0;
    padding-bottom: 60px;
  }
`;

const Brick2 = styled(Brick)`
  @media print {
    display: none;
  }
  @media screen and (max-width: 800px) {
    display: none;
  }
`;

const BrickTitle = styled.div`
  padding: 40px;
  border-bottom: 1px solid black;
  font-family: sans-serif;
  font-size: 20px;
  font-weight: bold;
  @media print {
    display: none;
  }
  @media screen and (max-width: 600px) {
    padding: 20px;
  }
`;

const BrickTitle1 = styled(BrickTitle)`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const BrickTitle2 = styled(BrickTitle)`
  @media screen and (max-width: 1200px) {
    border-top: 1px solid black;
  }
`;

const BrickContent = styled.div`
  padding: 40px;

  @media screen and (max-width: 600px) {
    padding: 20px;
  }
`;

const Reflow = styled.div`
  display: flex;
  flex: 4;
  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const MobileExpand = styled.div`
  position: fixed;
  height: 100vh;
  width: 100%;
  background: white;
  bottom: ${(props: { open: boolean }) =>
    props.open ? "-60px" : "calc(-100vh + 60px)"};
  transition: bottom 0.3s;
  @media print {
    height: auto;
    position: absolute;
    top: 0;
  }
  @media screen and (min-width: 800px) {
    display: none;
  }
`;

const MobileExpandHeader = styled.div`
  height: 60px;
  padding: 0 20px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 700;
  font-family: sans-serif;
  border-top: 3px solid black;
  cursor: pointer;
  @media print {
    display: none;
  }
`;

const Icon = styled.svg`
  margin-left: 20px;
`;

function App() {
  let [open, setOpen] = useState(false);

  return (
    <AppComponent>
      <Title>
        <TitleTextContainer>
          <TitleText>Water & Music NFT Contract Builder</TitleText>
          <ArticleLink
            href="https://www.waterandmusic.com/structuring-law-web3-music-modular-nft-contract-framework/"
            target="_blank"
            rel="noreferrer"
          >
            Read Article
          </ArticleLink>
        </TitleTextContainer>
        <LogoLink
          href="https://www.waterandmusic.com/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="logo.png" alt="Water & Music Logo" />
        </LogoLink>
      </Title>
      <AppLayout>
        <Brick2 style={{ flex: 0.4 }}>
          <BrickTitle>Progression</BrickTitle>
          <BrickContent>
            <Diagram />
          </BrickContent>
        </Brick2>
        <Reflow>
          <Brick1 style={{ flex: 1.8 }}>
            <BrickTitle1>Questions</BrickTitle1>
            <BrickContent>
              <Questions />
            </BrickContent>
          </Brick1>
          <Brick2 style={{ flex: "1.3", borderRight: "0" }}>
            <BrickTitle2>Contract</BrickTitle2>
            <BrickContent>
              <Contract />
            </BrickContent>
          </Brick2>
          <MobileExpand open={open}>
            <MobileExpandHeader onClick={() => setOpen(!open)}>
              Contract
              {open ? (
                <Icon
                  width="24"
                  height="24"
                  viewBox="4 4 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 9L12 15L18 9" stroke="currentColor" />
                </Icon>
              ) : (
                <Icon
                  width="24"
                  height="24"
                  viewBox="4 4 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 15L12 9L18 15" stroke="currentColor" />
                </Icon>
              )}
            </MobileExpandHeader>
            <BrickContent>
              <Contract />
            </BrickContent>
          </MobileExpand>
        </Reflow>
      </AppLayout>
    </AppComponent>
  );
}

export default App;
