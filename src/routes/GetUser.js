import React from "react";
import styled from "styled-components";

const Profile = styled.div`
  flex: 1;
  flex-direction: row;
`;

const ProfileName = styled.div`
  flex: 1;
`;

const ProfilePhoto = styled.div`
  flex: 1;
  width: 60px;
  height: 60px;
`;

class GetUser extends React.Component {
  // 사용자 정보를 가져온다면 갱신한다.
  state = {
    age_range: 0,
    profile_image_url: "",
  };

  componentDidMount() {
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
          age_range: email,
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
      <Profile>
        <ProfileName>{age_range ? age_range : ""}</ProfileName>
        <ProfilePhoto>
          <img
            style={{ width: "60px", height: "60px", borderRadius: "30px" }}
            src={profile_image_url}
            alt="profile_img"
            title="img_title"
          />
        </ProfilePhoto>
      </Profile>
    );
  }
}

export default GetUser;
