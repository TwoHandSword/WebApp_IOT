import React from "react";
import styled from "styled-components";
import GlobalFonts from "../fonts/fonts";
import KakaoLogin from "../components/kakaoLogin";

interface ContainerProps {
  width: number;
  height: number;
}

interface HeaderProps {
  width: number;
}

interface MainImgProps {
  width: number;
}

const Container = styled.div`
  flex: 1;
  width: ${(props) => props};
  height: ${(props) => props};
  background: #ffffff;
  padding-top: 56px;
  padding-left: 20px;
  padding-right: 20px;
`;

const Header = styled.div`
  flex: 1;
  width: ${(props) => props};
  height: 150px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const HeaderText = styled.div`
  flex: 1;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  color: #1f3350;
  font-family: "AppleSDGothicNeo";
  text-align: center;
`;

const MainImg = styled.div`
  height: 300px;
  width: ${(props) => props};
  display: flex;
  justify-content: center;
`;

const ButtonBox = styled.div`
  margin-top: 70px;
  flex: 1;
  display: flex;
  justify-content: center;
`;

class MainScreen extends React.Component {
  state = {
    isLoading: true,
    width: window.innerWidth,
    height: window.innerHeight,
    loginResult: false,
  };

  getDatas = () => {
    console.log("Hello world");
    this.setState({
      isLoading: false,
    });
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentDidMount() {
    this.getDatas();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const { isLoading } = this.state;
    console.log(window.innerHeight);
    console.log(this.state.height);
    return (
      <div style={{ width: "100%", height: "100%" }}>
        <GlobalFonts />
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Container width={this.state.width} height={this.state.height}>
            <Header width={this.state.width}>
              <HeaderText>Hello </HeaderText>
              <HeaderText>Let's get Your</HeaderText>
              <HeaderText>Stick!</HeaderText>
            </Header>
            <MainImg width={this.state.width}>
              <img
                style={{
                  width: "300px",
                  height: "300px",
                  resizeMode: "contain",
                }}
                src={require("../assets/img/oldman.jpg")}
              />
            </MainImg>
            <ButtonBox>
              <KakaoLogin></KakaoLogin>
            </ButtonBox>
          </Container>
        )}
      </div>
    );
  }
}
export default MainScreen;
