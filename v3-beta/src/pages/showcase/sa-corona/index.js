import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Stemmer, Tokenizer } from "sastrawijs";
import { Bar } from "react-chartjs-2";
import Layout from "templates/showcase";
import ORTLoader from "components/ort-loader";
import Loader from "components/loader/loader";
import metadata from "showcase/sa-corona.json";
import * as style from "./sa-corona.module.scss";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const SADetector = () => {
  const [words, setWords] = useState("");
  const [prediction, setPrediction] = useState({ class: null, probability: [0, 0, 0] });
  const [loading, setLoading] = useState({ state: true, message: "Loading onnxruntime-web..." });
  const [model, setModel] = useState(null);
  const [dependencies, setDependencies] = useState("loading");
  const chart = useRef(null);
  const labels = ["Negatif", "Netral", "Positif"];
  const stemmer = new Stemmer();
  const tokenizer = new Tokenizer();

  const preprocess = (words) => {
    const tokens = tokenizer.tokenize(words);
    return tokens.map((word) => stemmer.stem(word)).join(" ");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (words === "") alert("Please input words!");
    else if (model) {
      const input = new ort.Tensor("string", [preprocess(words)], [1, 1]);
      console.log(input);
      await model
        .run({ words: input })
        .then((results) => {
          setPrediction({
            class: labels[results.label.data[0]],
            probability: Array.from(results.probabilities.data),
          });
        })
        .catch((error) => {
          alert("Failed to predict!.");
          console.error(error);
        });
    } else alert("Model isn't loaded!");
  };

  useEffect(async () => {
    if (dependencies === "loaded" && model === null) {
      setLoading({ state: true, message: "Loading model..." });
      try {
        const session = await ort.InferenceSession.create(
          `${window.location.origin}/model/sa-model/model.onnx`
        );

        // warmup model
        const input = new ort.Tensor("string", ["jokowi cebong"], [1, 1]);
        await session.run({ words: input });
        setModel(session);
      } catch (e) {
        console.error(e);
        alert("Can't load model!");
      }
      setLoading({ state: false, message: "" });
    }
  }, [dependencies]);

  return (
    <Layout title={metadata.title} description={metadata.description}>
      <ORTLoader setLoad={setDependencies} />
      <div className={style.SADWrapper}>
        <div className={style.title}>
          <h2>{metadata.title}</h2>
          <p>
            Sentiment detector using TF-IDF and SVM trained with Indonesian twitter dataset on
            corona focused topic live in browser powered by <code>onnxruntime-web</code> with{" "}
            <code>wasm</code> backend.{" "}
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
          <Loader style={{ display: loading.state ? "inherit" : "none" }}>{loading.message}</Loader>
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
                  labels: labels,
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
