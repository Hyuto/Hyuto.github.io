import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import { ReactSketchCanvas } from "react-sketch-canvas";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Layout from "templates/showcase";
import Loader from "components/loader/loader";
import metadata from "showcase/digit-recognizer.json";
import * as style from "./digit-recognizer.module.scss";

tf.enableProdMode();
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const DigitRecognizer = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState({ state: "loading", progress: 0 });
  const canvas = useRef(null);
  const chart = useRef(null);
  const [chartdata, setChartdata] = useState({
    prob: Array(10).fill(0),
    pred: "",
  });

  const detectImage = (img) => {
    tf.engine().startScope();
    const input = tf.tidy(() => {
      // Get grayscale from image and do some preprocessing
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(img, 1), [28, 28])
        .div(255.0)
        .expandDims()
        .toFloat();
    }); // Tensor: [1, 28, 28, 1]
    const out = model.predict(input); // Get prediction
    setChartdata({
      pred: `${out.argMax(1).arraySync()[0]}`,
      prob: [...out.arraySync()[0]],
    });
    tf.dispose(out); // Disposes tensor to free up memory
    tf.engine().endScope();
  };

  useEffect(() => {
    tf.loadLayersModel(`${window.location.origin}/model/digit-recognizer/model.json`, {
      onProgress: (fractions) => {
        setLoading({ state: "loading", progress: fractions });
      },
    }).then((net) => {
      // Warmup the model before using real data.
      tf.tidy(() => {
        net.predict(tf.ones([28, 28, 1]).expandDims());
      });
      setModel(net);
      setLoading({ state: "ready", progress: 1 });
    });
  }, []);

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <div className={style.dsWrapper}>
        <div className={style.title}>
          <h2>Digit Recognizer</h2>
          <p>
            Using Tensorflow.js to predict handdrawing digits. Model trained on 42.000 MNIST data +
            Augmentation with 99.62% of accuracy{" "}
            <strong>
              <a
                href="https://github.com/Hyuto/Hyuto.github.io/tree/master/v3-beta/src/pages/showcase/digit-recognizer"
                rel="noreferrer"
                target="_blank"
              >
                Source Code
              </a>
            </strong>
          </p>
        </div>
        <div className={style.content}>
          <Loader style={{ display: loading.state === "ready" ? "none" : null }}>
            Loading model... {(loading.progress * 100).toFixed(2)}%
          </Loader>
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
                  x: {
                    ticks: {
                      beginAtZero: true,
                    },
                  },
                  y: {
                    stacked: true,
                  },
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
            disabled={loading.state === "loading"}
            className={loading.state === "loading" ? style.loading : null}
            onClick={() => {
              // Export canvas to image
              canvas.current.exportImage().then((canvasImg) => {
                const img = new Image();
                img.src = canvasImg;
                img.onload = () => {
                  // Detect image when loaded
                  detectImage(img);
                };
              });
            }}
          >
            predict
          </button>
          <button
            disabled={loading.state === "loading"}
            className={loading.state === "loading" ? style.loading : null}
            onClick={() => {
              canvas.current.clearCanvas();
              setChartdata({
                pred: "",
                prob: Array(10).fill(0),
              });
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
