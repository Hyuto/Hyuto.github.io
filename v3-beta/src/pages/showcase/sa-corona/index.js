import React, { useState } from "react";
import Layout from "templates/showcase";
import metadata from "showcase/sa-corona.json";
import * as style from "./sa-corona.module.scss";
import { useForm } from "react-hook-form";

const SADetector = () => {
  const { register, handleSubmit, reset } = useForm();
  const [prediction, setPrediction] = useState({ class: null, probability: null });

  const onSubmit = async data => {
    // Change to https://hyuto-blog.herokuapp.com/sa-corona/ for deployment
    const rawResponse = await fetch("http://127.0.0.1:5000/sa-corona/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const content = await rawResponse.json();
    setPrediction(content);
  };

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <div className={style.SADWrapper}>
        <div className={style.title}>
          <h2>{metadata.title}</h2>
          <p>
            Sentiment detector using SVM trained with Indonesian twitter dataset on corona focused
            topic{" "}
            <strong>
              <a href="https://github.com/Hyuto/Analisis-Sentimen-Corona-DKI-Jakarta">Repository</a>
              .
            </strong>
          </p>
        </div>
        <div className={style.content}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>Words</div>
            <input {...register("words", { required: true })} />
            <div className="btn-wrapper">
              <input className="btn submit" type="submit" value="Submit" />
              <button
                onClick={() => {
                  reset({ words: "" });
                  setPrediction({ class: null, proba: null });
                }}
              >
                Reset
              </button>
            </div>
          </form>
          <div>{prediction.class ? `Prediction : ${prediction.class}` : null}</div>
        </div>
      </div>
    </Layout>
  );
};

export default SADetector;
