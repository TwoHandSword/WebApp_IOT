import React, { Component, Fragment, useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import Amplify from "aws-amplify";
import { AWSIoTProvider } from "@aws-amplify/pubsub/lib/Providers";
import ReactHighcharts from "react-highcharts";
/*
function sub() {
  Amplify.PubSub.subscribe("pi/1").subscribe({
    next: (data) => {
      console.log("Message received", data.value.action);
      data_python = data.value.action;
    },
    error: (error) => console.error(error),
    close: () => console.log("Done"),
  });
}
*/

//GPS, 심박수, 가속도, 온도, 습도, 미세먼지,

//심박, 온도, 습도, 미세먼지 - 2차원 그래프

// GPS - 지도 [위도, 경도, 고도 - 표시] //이동 경로 -> 로직 추가 버튼을 추가 시작 종료
// 가속도 - cube.ai -> stirng : 이미지 사람 지팡이 변화

const High = () => {
  // function High
  const chartComponent = useRef(null);
  const [options, setOptions] = useState({
    title: {
      text: "heart rate",
    },
    xAxis: {
      type: "datetime",
      tickPixelInterval: 200,
      mazZoom: 20 * 1000,
    },
    series: [
      {
        name: "heart_rate",
        data: [0, 0, 0],
      },
    ],
  });

  useEffect(() => {
    var data_python = 0;
    Amplify.PubSub.subscribe("pi/1").subscribe({
      next: (data) => {
        console.log("Message received", data.value.action);
        data_python = data.value.action;
      },
      error: (error) => console.error(error),
      close: () => console.log("Done"),
    });

    const interval = setInterval(() => {
      const chart = chartComponent?.current.chart;
      if (chart) {
        chart.series[0].addPoint(data_python);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ width: "500px", height: "500px" }}>
      <HighchartsReact
        ref={chartComponent}
        highcharts={Highcharts}
        options={options}
      />
    </div>
  );
};

export default High;
