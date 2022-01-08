import React, { Component, Fragment } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Amplify from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";

const options = {
  chart: {
    defaultSeriesType: "spline",
  },
  title: {
    text: "temper",
  },
  xAxis: {
    type: "datetime",
    tickPixelInterval: 100,
    maxZoom: 20 * 500,
  },
  yAxis: {
    minPadding: 0.2,
    maxPadding: 0.2,
    title: {
      text: "temper",
      margin: 80,
    },
  },
  series: [
    {
      name: "test_11170",
      data: [1, 2, 3],
    },
  ],
};

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
  options.series[0].append(value);
}

class High extends Component {
  render() {
    sub();

    return (
      <Fragment>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </Fragment>
    );
  }
}
export default High;
