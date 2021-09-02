import React, { useState, useEffect, useRef } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { Bar } from "react-chartjs-2";
import { isMobile } from "react-device-detect";
import * as tf from "@tensorflow/tfjs";
import Layout from "components/showcase/layout";
import * as style from "./digit-recognizer.module.scss";
import metadata from "showcase/digit-recognizer.json";

const DigitRecognizer = ({ location }) => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState("loading");
  const canvas = useRef(null);
  const chart = useRef(null);
  const [chartdata, setChartdata] = useState({
    prob: Array(10).fill(0),
    pred: "",
  });

  const preprocess = img => {
    // convert the image data to a tensor
    const tensor = tf.browser.fromPixels(img, 1);
    // resize to 28 X 28
    const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
    // Normalize the image
    const offset = tf.scalar(255.0);
    const normalized = resized.div(offset);
    // Add a dimension to get a batch shape
    const batched = normalized.expandDims();
    return batched.toFloat();
  };

  useEffect(() => {
    const loadModel = async () =>
      await tf.loadLayersModel(`${location.origin}/model/digit-recognizer/model.json`);

    loadModel().then(e => {
      setModel(e);
      setLoading("ready");
      if (isMobile) tf.setBackend("cpu");
      else tf.setBackend("webgl");
    });
  }, [location]);

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <div className={style.dsWrapper}>
        <div className={style.title}>
          <h2>Digit Recognizer</h2>
          <p>
            Using Tensorflow.js to predict handdrawing digits. Model trained on 42.000 MNIST data +
            Augmentation with 99.62% of accuracy
          </p>
        </div>
        <div className={style.content}>
          <div
            className={style.spinnerWrapper}
            style={{ display: loading === "ready" ? "none" : "flex" }}
          >
            <div className={style.spinner}></div>
            <p>Loading model ...</p>
          </div>
          <ReactSketchCanvas
            className={style.canvas}
            style={{
              width: "250px",
              height: "250px",
              borderRadius: "10px",
            }}
            strokeWidth={25}
            strokeColor="white"
            canvasColor="black"
            ref={canvas}
          />
          <div className={style.chart}>
            <Bar
              data={{
                labels: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                datasets: [
                  {
                    label: "# Probabilitiy",
                    data: chartdata.prob,
                    backgroundColor: [
                      "rgba(255, 99, 132, 0.2)",
                      "rgba(54, 162, 235, 0.2)",
                      "rgba(255, 206, 86, 0.2)",
                      "rgba(75, 192, 192, 0.2)",
                      "rgba(153, 102, 255, 0.2)",
                      "rgba(255, 159, 64, 0.2)",
                      "rgba(200, 20, 50, 0.2)",
                      "rgba(100, 150, 50, 0.2)",
                      "rgba(153, 90, 150, 0.2)",
                      "rgba(20, 250, 100, 0.2)",
                    ],
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                indexAxis: "y",
                elements: {
                  bar: {
                    borderWidth: 2,
                  },
                },
                responsive: true,
                scales: {
                  xAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                  yAxes: [
                    {
                      stacked: true,
                    },
                  ],
                },
              }}
              ref={chart}
            />
          </div>
        </div>
        <div className={style.prediction}>
          {chartdata.pred !== "" ? `Prediction : ${chartdata.pred}` : ""}
        </div>
        <div className={style.button}>
          <button
            className={loading === "loading" ? style.loading : null}
            onClick={e => {
              e.preventDefault();
              if (loading === "ready") {
                canvas.current.exportImage().then(e => {
                  const img = new Image();
                  img.src = e;

                  img.onload = () => {
                    const out = model.predict(preprocess(img));
                    setChartdata({
                      pred: `${out.argMax(1).arraySync()[0]}`,
                      prob: out.arraySync()[0],
                    });
                  };
                });
              }
            }}
          >
            predict
          </button>
          <button
            className={loading === "loading" ? style.loading : null}
            onClick={e => {
              e.preventDefault();
              if (loading === "ready") {
                canvas.current.clearCanvas();
                setChartdata({
                  pred: "",
                  prob: Array(10).fill(0),
                });
              }
            }}
          >
            clear
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default DigitRecognizer;
