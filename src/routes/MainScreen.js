import React from "react";
import "./MainScreen.css";

class MainScreen extends React.Component {
  state = {
    isLoading: true,
  };

  getDatas = () => {
    console.log("Hello world");
    this.setState({
      isLoading: false,
    });
  };

  componentDidMount() {
    this.getDatas();
  }

  render() {
    const { isLoading } = this.state;
    return (
      <div style={{ width: "100%", height: "100%" }}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="mainBody">
            <div style={{ flex: 1 }}></div>
          </div>
        )}
      </div>
    );
  }
}
export default MainScreen;
