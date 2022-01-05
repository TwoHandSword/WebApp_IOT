import React from "react";
import styled from "styled-components";
import GlobalFonts from "../fonts/fonts";

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

const { Kakao } = window;

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

  doLogin = () => {
    this.setState({
      loginResult: true,
    });
  };

  loginWithKakao = () => {
    const scope = "profile_nickname,profile_image, account_email";
    Kakao.Auth.login({
      scope,
      // success는 인증 정보를 응답(response)으로 받는다.
      success: function (response) {
        //카카오 SDK에 사용자 토큰을 설정한다.
        window.Kakao.Auth.setAccessToken(response.access_token);
        console.log(`is set?: ${window.Kakao.Auth.getAccessToken()}`);

        var ACCESS_TOKEN = window.Kakao.Auth.getAccessToken();

        window.Kakao.API.request({
          url: "/v2/user/me",
          success: function ({ kakao_account }) {
            //어떤 정보 넘어오는지 확인
            console.log(kakao_account);
            const { email, profile } = kakao_account;

            console.log(email);
            console.log(`responsed img: ${profile.profile_image_url}`);
            console.log(profile.nickname);
            /*
            axios({
              method: "post",
              url: "/auth/sns",
              data: {
                id: email,
                nickname: profile.nickname,
                image: profile.profile_image_url,
              },
            })
              .then((res) => {
                console.log(res);
                // history.push("/main/feed");
              })
              .catch((error) => {
                // console.log(error);
                console.error(error);
                alert("카카오 로그인 에러?");
              });
              */
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
      fail: function (error) {
        console.log("에러발생");
        console.log(error);
      },
    });

    /*
    console.log("hello");
    Kakao.Auth.authorize({
      redirectUri: "http://localhost:3000/kakaoLogin",
    });
    */
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
              <div>
                <a id="custom-login-btn" onClick={this.loginWithKakao}>
                  <img
                    src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
                    width="222"
                  />
                </a>
              </div>
            </ButtonBox>
          </Container>
        )}
      </div>
    );
  }
}
export default MainScreen;
