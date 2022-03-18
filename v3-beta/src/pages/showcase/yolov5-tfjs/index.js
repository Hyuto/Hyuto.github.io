import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Layout from "templates/showcase";
import Loader from "components/loader/loader";
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose";
import labels from "./labels.json";
import metadata from "showcase/yolov5-tfjs.json";
import * as style from "./yolov5-tfjs.module.scss";

tf.enableProdMode();

const YOLOv5OD = () => {
  const threshold = 0.35;
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState("close");
  const [lcimage, setLCImage] = useState("close");
  const [loading, setLoading] = useState("loading");
  const [aniId, setAniId] = useState(null);
  const inputImage = useRef(null);
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const openWebcam = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            facingMode: "environment",
          },
        })
        .then((stream) => {
          window.localStream = stream;
          videoRef.current.srcObject = stream;
          setWebcam("open");
          videoRef.current.onloadedmetadata = () => {
            detectFrame();
          };
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

  const renderPrediction = (boxes_data, scores_data, classes_data) => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clean canvas

    const font = "16px sans-serif";
    ctx.font = font;
    ctx.textBaseline = "top";

    for (let i = 0; i < scores_data.length; ++i) {
      if (scores_data[i] > threshold) {
        let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
        x1 *= canvasRef.current.width;
        x2 *= canvasRef.current.width;
        y1 *= canvasRef.current.height;
        y2 *= canvasRef.current.height;
        const width = x2 - x1;
        const height = y2 - y1;
        const klass = labels[classes_data[i]];
        const score = (scores_data[i] * 100).toFixed(1);

        // Draw the bounding box.
        ctx.strokeStyle = "#00FF00";
        ctx.lineWidth = 2;
        ctx.strokeRect(x1, y1, width, height);

        // Draw the label background.
        ctx.fillStyle = "#00FF00";
        const textWidth = ctx.measureText(klass + " - " + score + "%").width;
        const textHeight = parseInt(font, 10); // base 10
        ctx.fillRect(x1 - 1, y1 - (textHeight + 2), textWidth + 2, textHeight + 2);

        // Draw labels
        ctx.fillStyle = "#ffffff";
        ctx.fillText(klass + " - " + score + "%", x1 - 1, y1 - (textHeight + 2));
      }
    }
  };

  const detectFrame = async () => {
    if (videoRef.current.srcObject) {
      tf.engine().startScope();
      let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
      const input = tf.tidy(() => {
        return tf.image
          .resizeBilinear(tf.browser.fromPixels(videoRef.current), [modelWidth, modelHeight])
          .div(255.0)
          .expandDims(0);
      });

      await model.executeAsync(input).then((res) => {
        const [boxes, scores, classes] = res.slice(0, 3);
        const boxes_data = boxes.dataSync();
        const scores_data = scores.dataSync();
        const classes_data = classes.dataSync();
        renderPrediction(boxes_data, scores_data, classes_data);
        tf.dispose(res);
      });

      const reqId = requestAnimationFrame(detectFrame);
      setAniId(reqId);
      tf.engine().endScope();
    }
  };

  const detectImage = async () => {
    tf.engine().startScope();
    let [modelWidth, modelHeight] = model.inputs[0].shape.slice(1, 3);
    const input = tf.tidy(() => {
      return tf.image
        .resizeBilinear(tf.browser.fromPixels(imageRef.current), [modelWidth, modelHeight])
        .div(255.0)
        .expandDims(0);
    });

    await model.executeAsync(input).then((res) => {
      const [boxes, scores, classes] = res.slice(0, 3);
      const boxes_data = boxes.dataSync();
      const scores_data = scores.dataSync();
      const classes_data = classes.dataSync();
      renderPrediction(boxes_data, scores_data, classes_data);
      tf.dispose(res);
    });
    tf.engine().endScope();
  };

  useEffect(() => {
    tf.loadGraphModel(`${window.location.origin}/model/yolov5n_web_model/model.json`).then(
      async (yolov5) => {
        // Warmup the model before using real data.
        const dummyInput = tf.ones(yolov5.inputs[0].shape);
        await yolov5.executeAsync(dummyInput).then((warmupResult) => {
          tf.dispose(warmupResult);
          tf.dispose(dummyInput);

          setModel(yolov5);
          setLoading("ready");
        });
      }
    );
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
            <img
              style={{ display: lcimage === "open" ? "block" : "none" }}
              src="#"
              ref={imageRef}
            />
            <canvas
              width={640}
              height={360}
              style={{
                display: webcam === "open" || lcimage === "open" ? "block" : "none",
              }}
              ref={canvasRef}
            />
            <FaWindowClose
              size={30}
              color="black"
              className={style.close}
              style={{ display: lcimage === "open" ? "block" : "none" }}
              onClick={() => {
                const ctx = canvasRef.current.getContext("2d");
                ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
                inputImage.current.value = "";
                imageRef.current.src = "#";
                setLCImage("close");
              }}
            />
          </div>
          <div className={style.btnWrapper}>
            <input
              type="file"
              ref={inputImage}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => {
                if (e.target.files[0] !== null) {
                  const f = e.target.files[0];
                  const src = window.URL.createObjectURL(f);
                  imageRef.current.src = src;
                  setLCImage("open");
                  imageRef.current.onload = () => {
                    detectImage();
                    window.URL.revokeObjectURL(src);
                  };
                }
              }}
            />
            <button
              disabled={webcam === "open"}
              onClick={() => {
                inputImage.current.click();
              }}
            >
              Open Local Image
            </button>

            <button
              disabled={lcimage === "open"}
              onClick={() => {
                if (webcam === "close") {
                  openWebcam();
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
