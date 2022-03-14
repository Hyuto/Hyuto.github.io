import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import { isMobile } from "react-device-detect";
import Layout from "templates/showcase";
import Loader from "components/loader/loader";
import labels from "./labels.json";
import metadata from "showcase/yolov5-tfjs.json";
import * as style from "./yolov5-tfjs.module.scss";

const SADetector = () => {
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState("loading");

  useEffect(() => {
    tf.loadGraphModel(`${window.location.origin}/model/yolov5n_web_model/model.json`).then((e) => {
      setModel(e);
      setLoading("ready");
      if (isMobile) tf.setBackend("cpu");
      else tf.setBackend("webgl");
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
          <div className={style.main}></div>
          <div className={style.btnWrapper}>
            <button
              onClick={() => {
                console.log(model);
                console.log(labels);
              }}
            >
              Submit
            </button>
            <button>Reset</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SADetector;
