import React from "react";
import styled from "styled-components";

interface ContainerProps {
  width: number;
  height: number;
}

interface BodyProps {
  height: Number;
}

const Container = styled.div`
  flex: 1;
  width: ${(props) => props};
  height: ${(props) => props};
  //background: yellow;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: row;
  height: 80px;
  padding-top: 20px;
  padding-left: 20px;
  padding-right: 20px;
  //background: blue;
`;

const ProfileName = styled.div`
  flex: 1;
  font-size: 20px;
  font-weight: bold;
  padding-top: 18px;
  padding-left: 20px;
  display: flex;
  //background: green;
`;

const ProfilePhoto = styled.div`
  //flex: 1;
  height: 80px;
  width: 80px;
  //padding-left: 10px;
  //padding-top: 10px;
  //background: red;
`;

const Body = styled.div`
  flex: 1;
  height: ${(props) => props};
  background: red;
`;
class GetUser extends React.Component {
  // 사용자 정보를 가져온다면 갱신한다.
  state = {
    age_range: 0,
    profile_image_url: "",
    width: window.innerWidth,
    height: window.innerHeight,
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);

    const GetUser = this;

    // login함수와 비슷하다. 사용자 정보를 가져오면 success콜백
    window.Kakao.API.request({
      url: "/v2/user/me",
      success: function ({ kakao_account }) {
        const { email, profile } = kakao_account;
        console.log(email);
        console.log(`responsed img: ${profile.profile_image_url}`);
        // 수집한 사용자 정보로 페이지를 수정하기 위해 setState
        GetUser.setState({
          age_range: profile.nickname,
          profile_image_url: profile.profile_image_url,
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  }

  render() {
    const { age_range, profile_image_url } = this.state;

    return (
      <Container width={this.state.width} height={this.state.height}>
        <Profile>
          <ProfilePhoto>
            <img
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "30px",
                borderWidth: "2px",
                borderColor: "red",
              }}
              src={profile_image_url}
              alt="profile_img"
              title="img_title"
            />
          </ProfilePhoto>
          <ProfileName>{age_range ? age_range : ""}'s Sticks!</ProfileName>
        </Profile>
        <div style={{ height: "2px", backgroundColor: "#e4e7ec" }}></div>
        <Body height={this.state.height - 80}>하이</Body>
      </Container>
    );
  }
}

export default GetUser;
