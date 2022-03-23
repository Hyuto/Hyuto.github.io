import React, { useState, useRef } from "react";
import { Bar } from "react-chartjs-2";
import Layout from "templates/showcase";
import Loader from "components/loader/loader";
import metadata from "showcase/sa-corona.json";
import * as style from "./sa-corona.module.scss";

const SADetector = () => {
  const [words, setWords] = useState("");
  const [prediction, setPrediction] = useState({ class: null, probability: [0, 0] });
  const [loading, setLoading] = useState(false);
  const chart = useRef(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch("https://hyuto-blog.herokuapp.com/sa-corona/", {
      method: "POST",
      mode: "cors",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ words: words }),
    })
      .then((content) => content.json())
      .then((content) => {
        setLoading(false);
        setPrediction(content);
      })
      .catch((error) => {
        setLoading(false);
        alert("Error : Can't send request to the server.");
        console.log(error);
      });
  };

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <div className={style.SADWrapper}>
        <div className={style.title}>
          <h2>{metadata.title}</h2>
          <p>
            Sentiment detector using SVM trained with Indonesian twitter dataset on corona focused
            topic.{" "}
            <strong>
              <a
                href="https://github.com/Hyuto/Analisis-Sentimen-Corona-DKI-Jakarta"
                rel="noreferrer"
                target="_blank"
              >
                Repository
              </a>
            </strong>
          </p>
        </div>
        <div className={style.content}>
          <Loader style={{ display: loading ? "inherit" : "none" }}>Sending to server...</Loader>
          <div className={style.main}>
            <form className={style.form}>
              <div className={style.title}>Words</div>
              <textarea
                className={style.words}
                value={words}
                onChange={(e) => setWords(e.target.value)}
              ></textarea>
            </form>
            <div className={style.chart}>
              <Bar
                data={{
                  labels: ["Negatif", "Netral", "Positif"],
                  datasets: [
                    {
                      label: "# Probabilitiy",
                      data: prediction.probability,
                      backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
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
          <div className={style.btnWrapper}>
            <button onClick={onSubmit}>Submit</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setWords("");
                setPrediction({ class: null, proba: null });
              }}
            >
              Reset
            </button>
          </div>
          <div className={style.prediction}>
            {prediction.class ? `Prediction : ${prediction.class}` : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SADetector;
