import React from "react";
import styled from "styled-components";
import Amplify from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
import High from "../components/chart";
import StoreLocation from "../components/Map";

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
  height: 80px;
  width: 80px;
`;

const Body = styled.div`
  flex: 1;
  height: ${(props) => props};
  padding-top: 20px;
  background: #f7f9fb;
`;

const MonitoringBlock = styled.div`
  flex: 1;
  height: 50px;
  width: 440px;
  background: #d8d8d8;
  display: flex;
  //ustify-content: center;
  align-items: center;
  padding-left: 20px;
  border-radius: 10px;
`;

const DisplayNumber = styled.div`
  //flex; 1;
  height: 30px;
  width: 180px;
  border-radius: 4px;
  border: 1px;
  border-color: #e4e7ec;
  background: #ffffff;
  display: "flex";
  justify-content: "center";
  align-items: "center";
  text-align: "center";
  padding-left: 20px;
  font-size: 20px;
`;
class GetUser extends React.Component {
  // 사용자 정보를 가져온다면 갱신한다.
  state = {
    age_range: 0,
    profile_image_url: "",
    width: window.innerWidth,
    height: window.innerHeight,
    storeCoordinate: [35.85133, 127.734086],
    HeartRate: 0,
    Temperature: 0,
    Humidity: 0,
    AirPollution: 0,
    Heat: 0,
    isStarting: false,
    buttonName: "Start",
    stateDescription: "Search...Device",
    stateLight: "#F78181",
    price: 0,
  };

  updateMonitoringPrice = (data) => {
    this.setState({
      price: data,
    });
  };

  updateMonitoringHeartRate = (data) => {
    this.setState({
      HeartRate: data,
    });
  };

  updateMonitoringTemperature = (data) => {
    this.setState({
      Temperature: data,
    });
  };

  updateMonitoringHumidity = (data) => {
    this.setState({
      Humidity: data,
    });
  };

  updateMonitoringAirPollution = (data) => {
    this.setState({
      AirPollution: data,
    });
  };

  updateMonitoringHeat = (data) => {
    this.setState({
      Heat: data,
    });
  };

  updateDimensions = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  };

  updateStateButton = () => {
    if (this.state.isStarting === false) {
      this.pub_start();
      this.setState({
        isStarting: true,
        buttonName: "Stop",
        stateDescription: "Working....",
        stateLight: "#A9F5BC",
      });
    } else {
      this.pub_stop();
      this.setState({
        isStarting: false,
        buttonName: "Start",
        stateDescription: "Search...Device",
        stateLight: "#F78181",
      });
    }
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

  pub_zero_warmer = async () => {
    try {
      await Amplify.PubSub.publish("iotdemo/topic/2", {
        warmer: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  pub_one_warmer = async () => {
    try {
      await Amplify.PubSub.publish("iotdemo/topic/2", {
        warmer: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  pub_two_warmer = async () => {
    try {
      await Amplify.PubSub.publish("iotdemo/topic/2", {
        warmer: 2,
      });
    } catch (error) {
      console.log(error);
    }
  };

  pub_start = async () => {
    try {
      await Amplify.PubSub.publish("iotdemo/topic/1", {
        OnOff: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  pub_stop = async () => {
    try {
      await Amplify.PubSub.publish("iotdemo/topic/1", {
        OnOff: 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
          <div
            style={{
              width: "200px",
              height: "60px",
              backgroundColor: "#000000",
              borderRadius: "8px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "yellow",
              fontSize: "30px",
            }}
          >
            Price : {this.state.price}
          </div>
          <div
            style={{
              width: "300px",
              height: "60px",
              display: "flex",
              flexDirection: "row",
              borderRadius: "8px",
              marginLeft: "50px",
            }}
          >
            <div
              style={{
                height: "60px",
                width: "80px",
                backgroundColor: "#E6E6E6",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: "8px",
              }}
              onClick={this.updateStateButton}
            >
              {this.state.buttonName}
            </div>
            <div
              style={{
                height: "60px",
                width: "180px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#A4A4A4",
              }}
            >
              {this.state.stateDescription}
            </div>
            <div
              style={{
                height: "60px",
                width: "60px",
                borderRadius: "30px",
                backgroundColor: this.state.stateLight,
              }}
            ></div>
          </div>
        </Profile>
        <div style={{ height: "2px", backgroundColor: "#e4e7ec" }}></div>

        {this.state.isStarting ? (
          <Body height={this.state.height - 80}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "40px",
              }}
            >
              <StoreLocation
                style={{
                  width: "500px",
                  height: "500px",
                }}
                storeCoordinate={this.state.storeCoordinate}
              ></StoreLocation>

              <div
                style={{
                  marginLeft: "40px",
                  width: "500px",
                  height: "400px",
                  backgroundColor: "#CEE3F6",
                  borderRadius: "8px",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    width: "460px",
                    height: "300px",
                    //backgroundColor: "blue",
                    margin: "20px",
                    flexDirection: "column",
                  }}
                >
                  <MonitoringBlock>
                    <DisplayNumber>
                      Heaet Rate : {this.state.HeartRate}
                    </DisplayNumber>
                  </MonitoringBlock>
                  <MonitoringBlock>
                    <DisplayNumber>
                      Temperature : {this.state.Temperature}
                    </DisplayNumber>
                  </MonitoringBlock>
                  <MonitoringBlock>
                    <DisplayNumber>
                      Humidity : {this.state.Humidity}
                    </DisplayNumber>
                  </MonitoringBlock>
                  <MonitoringBlock>
                    <DisplayNumber>
                      Air Pollution : {this.state.AirPollution}
                    </DisplayNumber>
                  </MonitoringBlock>
                  <MonitoringBlock>
                    <DisplayNumber>
                      Warmer temp : {this.state.Heat}
                    </DisplayNumber>
                  </MonitoringBlock>
                </div>

                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    width: "460px",
                    height: "50px",
                    paddingLeft: "20px",
                    paddingRight: "20px",
                  }}
                >
                  <div
                    style={{
                      height: "50px",
                      width: "120px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#F5A9A9",
                    }}
                    onClick={this.pub_zero_warmer}
                  >
                    Warmer : 0
                  </div>
                  <div
                    style={{
                      height: "50px",
                      width: "120px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#F7BE81",
                    }}
                    onClick={this.pub_one_warmer}
                  >
                    Warmer : 1
                  </div>
                  <div
                    style={{
                      height: "50px",
                      width: "120px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#FFBF00",
                    }}
                    onClick={this.pub_two_warmer}
                  >
                    Warmer : 2
                  </div>
                  <div
                    style={{
                      height: "50px",
                      width: "100px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#D8D8D8",
                    }}
                  ></div>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <High
                channelName="stm/heart"
                signalName="Heart Rates"
                getData={this.updateMonitoringHeartRate}
              ></High>
              <High
                channelName="stm/temperature"
                signalName="Temperature"
                getData={this.updateMonitoringTemperature}
              ></High>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <High
                channelName="stm/hum"
                signalName="Humidity"
                getData={this.updateMonitoringHumidity}
              ></High>
              <High
                channelName="stm/air"
                signalName="Air pollution"
                getData={this.updateMonitoringAirPollution}
              ></High>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <High
                channelName="stm/heat"
                signalName="Warmer"
                getData={this.updateMonitoringHeat}
              ></High>
              <High
                channelName="pi/charge"
                signalName="charge"
                getData={this.updateMonitoringPrice}
              ></High>
            </div>
          </Body>
        ) : (
          <Body height={this.state.height - 80}></Body>
        )}
      </Container>
    );
  }
}

export default GetUser;
