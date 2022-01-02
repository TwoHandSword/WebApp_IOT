import React from "react";
import styled from "styled-components"

interface ContainerProps{
  width: number;
  height: number;
}

const Container = styled.div`
flex: 1;
width:${props => props.width};
height:${props => props.height};
background:#117aff;
`;

class MainScreen extends React.Component {
  state = {
    isLoading: true,
    width: window.innerWidth,
    height: window.innerHeight,
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
          <Container width={this.state.width} height={this.state.height}>
            hello
          </Container>
        )}
      </div>
    );
  }
}
export default MainScreen;
