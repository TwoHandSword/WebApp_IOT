import React from "react";
import styled from "styled-components";
import Amplify from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
import High from "../components/chart";

function init() {
  Amplify.configure({
    Auth: {
      identityPoolId: process.env.REACT_APP_IDENTITY_POOL_ID,
      region: process.env.REACT_APP_REGION,
      userPoolId: process.env.REACT_APP_USER_POOL_ID,
      userPoolWebClientId: process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    },
  });

  Amplify.addPluggable(
    new AWSIoTProvider({
      aws_pubsub_region: process.env.REACT_APP_REGION,
      aws_pubsub_endpoint: `wss://${process.env.REACT_APP_MQTT_ID}.iot.${process.env.REACT_APP_REGION}.amazonaws.com/mqtt`,
    })
  );
}

/*
function sub() {
  Amplify.PubSub.subscribe("pi/1").subscribe({
    next: (data) => {
      console.log("Message received", data.value.message);
      mqttMessage(data.value.message);
    },
    error: (error) => console.error(error),
    close: () => console.log("Done"),
  });
}

function mqttMessage(value) {
  let point = {
    x: new Date().getTime(),
    y: value,
    marker: { enabled: false },
  };
  date[0].addPoint(point, true, false);
}
interface ContainerProps {
  width: number;
  height: number;
}
*/

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

    init(); // initialize AWS
    //sub(); // subscribe
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
        <Body height={this.state.height - 80}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <High channelName="pi/1" signalName="Heart Rates"></High>
            <High channelName="pi/2" signalName="Temperature"></High>
          </div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <High channelName="pi/3" signalName="Humidity"></High>
            <High channelName="pi/4" signalName="Air pollution"></High>
          </div>
        </Body>
      </Container>
    );
  }
}

export default GetUser;
