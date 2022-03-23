import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Multiselect from "multiselect-react-dropdown";
import { FaWindowClose } from "@react-icons/all-files/fa/FaWindowClose";
import { AiFillSetting } from "@react-icons/all-files/ai/AiFillSetting";
import Layout from "templates/showcase";
import Loader from "components/loader/loader";
import labels from "./labels.json";
import metadata from "showcase/yolov5-tfjs.json";
import * as style from "./yolov5-tfjs.module.scss";

tf.enableProdMode();
const modelOption = [
  { value: "yolov5n", label: "YOLOv5n - lighter model" },
  { value: "yolov5s", label: "YOLOv5s" },
];
const labelsOption = labels.map((element) => {
  return { value: element, label: element.charAt(0).toUpperCase() + element.slice(1) };
});

const YOLOv5OD = () => {
  const [model, setModel] = useState(null);
  const [webcam, setWebcam] = useState("close");
  const [lcimage, setLCImage] = useState("close");
  const [loading, setLoading] = useState("loading");
  const [settings, setSettings] = useState("close");
  const [aniId, setAniId] = useState(null);
  const [threshold, setThreshold] = useState({ value: 0.35, changed: false });
  const [modelName, setModelName] = useState("yolov5n");
  const [find, setFind] = useState([]);
  const inputNumber = useRef(null);
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
      if (scores_data[i] > threshold.value) {
        const klass = labels[classes_data[i]];
        const score = (scores_data[i] * 100).toFixed(1);

        if (find.length > 0 && find.every((e) => e.value !== klass)) {
          continue;
        }

        let [x1, y1, x2, y2] = boxes_data.slice(i * 4, (i + 1) * 4);
        x1 *= canvasRef.current.width;
        x2 *= canvasRef.current.width;
        y1 *= canvasRef.current.height;
        y2 *= canvasRef.current.height;
        const width = x2 - x1;
        const height = y2 - y1;

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
    setLoading("loading");
    tf.loadGraphModel(`${window.location.origin}/model/${modelName}_web_model/model.json`).then(
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
  }, [modelName]);

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <div className={style.YOLOWrapper}>
        <div className={style.title}>
          <h2>{metadata.title}</h2>
          <p>
            {metadata.description}{" "}
            <strong>
              <a
                href="https://github.com/Hyuto/Hyuto.github.io/tree/master/v3-beta/src/pages/showcase/yolov5-tfjs"
                rel="noreferrer"
                target="_blank"
              >
                Source Code
              </a>
            </strong>
          </p>
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
              className={style.nonActive}
              onClick={() => {
                inputImage.current.click();
              }}
            >
              Open Local Image
            </button>

            <button
              disabled={lcimage === "open"}
              className={webcam === "open" ? style.Active : style.nonActive}
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
            <button
              className={settings === "open" ? style.Active : style.nonActive}
              onClick={() => {
                setSettings(settings === "open" ? "close" : "open");
              }}
            >
              <AiFillSetting />
            </button>
          </div>
          <div
            style={{ display: settings === "open" ? "block" : "none" }}
            className={style.settings}
          >
            <div className={style.title}>Settings</div>
            <div className={style.content}>
              <p>
                <strong>Threshold</strong> :{" "}
                <input
                  type="number"
                  name="threshold"
                  defaultValue={threshold.value}
                  ref={inputNumber}
                  disabled={webcam === "open"}
                  onChange={(e) => {
                    if (e.target.valueAsNumber !== threshold.value)
                      setThreshold({ value: threshold.value, changed: true });
                    else setThreshold({ value: threshold.value, changed: false });
                  }}
                />{" "}
                {threshold.changed ? (
                  <button
                    disabled={webcam === "open"}
                    onClick={() => {
                      if (
                        inputNumber.current.valueAsNumber > 0 &&
                        inputNumber.current.valueAsNumber < 1
                      )
                        setThreshold({ value: inputNumber.current.valueAsNumber, changed: false });
                      else {
                        alert("Threshold value must have value between 0 and 1!");
                        setThreshold({ value: threshold.value, changed: false });
                        inputNumber.current.value = threshold.value;
                      }
                    }}
                  >
                    Update
                  </button>
                ) : null}
              </p>
              <div className={style.contentTitle}>Model</div>
              <Multiselect
                customCloseIcon={<></>}
                disable={webcam === "open"}
                options={modelOption}
                displayValue="label"
                selectedValues={modelOption.filter((element) => element.value === modelName)}
                onSelect={(_, selectedItem) => {
                  if (selectedItem.value !== modelName) {
                    model.dispose();
                    tf.dispose(model);
                    setModelName(selectedItem.value);
                  }
                }}
                singleSelect
                style={{
                  option: {
                    margin: "0",
                  },
                }}
              />
              <div className={style.contentTitle}>Specific Detection</div>
              <Multiselect
                options={labelsOption}
                displayValue="label"
                showArrow={true}
                selectedValues={find}
                selectionLimit={10}
                disable={webcam === "open"}
                onSelect={(selectedList) => {
                  if (selectedList !== find) setFind(selectedList);
                }}
                onRemove={(selectedList) => {
                  if (selectedList !== find) setFind(selectedList);
                }}
                style={{
                  chips: {
                    backgroundColor: "black",
                  },
                  option: {
                    margin: "0",
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default YOLOv5OD;
