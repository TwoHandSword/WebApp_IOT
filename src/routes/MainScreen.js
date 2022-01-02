import React from "react";
import "./MainScreen.css";

class MainScreen extends React.Component {
  state = {
    isLoading: true,
    width: 0,
    height: 0,
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
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={{width: this.state.width, height: this.state.height, backgroundColor: "#117aff"}}>
            <div style={{ flex: 1 }}>Hello</div>
          </div>
        )}
      </div>
    );
  }
}
export default MainScreen;
