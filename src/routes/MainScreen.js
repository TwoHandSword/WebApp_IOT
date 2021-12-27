import React from "react";

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
      <div style={{ flex: 1 }}>
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div style={{ flex: 1 }}>already Load</div>
        )}
      </div>
    );
  }
}
export default MainScreen;
