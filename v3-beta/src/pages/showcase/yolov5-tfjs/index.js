import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import Layout from "templates/showcase";
import Loader from "components/loader/loader";
import labels from "./labels.json";
import metadata from "showcase/yolov5-tfjs.json";
import * as style from "./yolov5-tfjs.module.scss";

const YOLOv5OD = () => {
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState("close");
  const [loading, setLoading] = useState("loading");
  const [aniId, setAniId] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openWebcam = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "user",
          },
        })
        .then((stream) => {
          window.localStream = stream;
          videoRef.current.srcObject = stream;
          setWebcam("open");
        });
    } else alert("Can't open Webcam!");
  };

  const closeWebcam = () => {
    if (videoRef.current.srcObject) {
      videoRef.current.srcObject = null;
      window.localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setWebcam("close");
    } else alert("Please open Webcam first!");
  };

  const renderPrediction = (boxes_data, scores_data, classes_data, valid_detections_data) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); //clean canvas

    const font = "11px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    for (let i = 0; i < valid_detections_data; ++i) {
      let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
      x1 *= canvasRef.current.width;
      x2 *= canvasRef.current.width;
      y1 *= canvasRef.current.height;
      y2 *= canvasRef.current.height;
      const width = x2 - x1;
      const height = y2 - y1;
      const klass = labels[classes_data[i]];
      const score = scores_data[i].toFixed(2);

      // Draw the bounding box.
      ctx.strokeStyle = "#00FFFF";
      ctx.lineWidth = 2;
      ctx.strokeRect(x1, y1, width, height);

      // Draw the label background.
      ctx.fillStyle = "#00FFFF";
      const textWidth = ctx.measureText(klass + ":" + score).width;
      const textHeight = parseInt(font, 10); // base 10
      ctx.fillRect(x1, y1, textWidth + 4, textHeight + 4);
      ctx.fillStyle = "#000000";
      ctx.fillText(klass + ":" + score, x1, y1);
    }
  };

  const detectFrame = () => {
    tf.engine().startScope();
    let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
    const input = tf.tidy(() => {
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(videoRef.current), [modelWidth, modelHeight])
        .div(255.0)
        .expandDims(0);
    });

    model.executeAsync(input).then((res) => {
      const [boxes, scores, classes, valid_detections] = res;
      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();
      const valid_detections_data = valid_detections.dataSync()[0];
      renderPrediction(boxes_data, scores_data, classes_data, valid_detections_data);
      tf.dispose(res);
    });

    const reqId = requestAnimationFrame(() => {
      detectFrame();
    });
    setAniId(reqId);
    tf.engine().endScope();
  };

  useEffect(() => {
    tf.loadGraphModel(`${window.location.origin}/model/yolov5n_web_model/model.json`).then((e) => {
      setModel(e);
      setLoading("ready");
      tf.setBackend("webgl");
    });
  }, []);

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <div className={style.YOLOWrapper}>
        <div className={style.title}>
          <h2>{metadata.title}</h2>
          <p>{metadata.description}</p>
        </div>
        <div className={style.content}>
          <Loader style={{ display: loading === "ready" ? "none" : null }}>Loading model...</Loader>
          <div className={style.main}>
            <video
              style={{ display: webcam === "open" ? "block" : "none" }}
              autoPlay
              playsInline
              muted
              ref={videoRef}
            />
            <canvas
              style={{
                display: webcam === "open" ? "block" : "none",
                position: "absolute",
                top: "0",
                left: "0",
              }}
              ref={canvasRef}
            />
          </div>
          <div className={style.btnWrapper}>
            <button
              disabled={loading === "loading"}
              onClick={() => {
                if (webcam === "close") {
                  openWebcam();
                  videoRef.current.onloadedmetadata = (e) => {
                    detectFrame();
                  };
                } else {
                  cancelAnimationFrame(aniId);
                  setAniId(null);
                  closeWebcam();
                }
              }}
            >
              {webcam === "open" ? "Close" : "Open"} Webcam
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YOLOv5OD;
