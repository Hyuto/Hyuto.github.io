import React, { useState, useEffect, useRef } from "react"
import { PageProps } from "gatsby"
import { ReactSketchCanvas } from 'react-sketch-canvas'
import { Bar } from 'react-chartjs-2'
import { isMobile } from 'react-device-detect';
import * as tf from '@tensorflow/tfjs';
import Layout from "../../../components/showcase/layout"
import './style.scss'

if (isMobile)
  tf.setBackend('cpu');

class ModelHandler {
  path: string;

  constructor(path: string) {
    this.path = path;
  }

  load = async () => {
    return await tf.loadLayersModel(this.path);
  }

  preprocess = (img) => {
    //convert the image data to a tensor 
    const tensor = tf.browser.fromPixels(img, 1);
    //resize to 28 X 28
    const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = resized.div(offset);
    // We add a dimension to get a batch shape
    const batched = normalized.expandDims();

    return batched.toFloat()
  }
}

const DigitRecognizer: React.FC<PageProps> = ({ location }) => {
  const [model, setModel] = useState<tf.LayersModel | null>(null)
  const Handler = new ModelHandler(`${location.origin}/model/digit-recognizer/model.json`);
  const canvas = useRef(null);
  const chart = useRef(null);
  const [chartdata, setChartdata] = useState({
    prob: Array(10).fill(0),
    pred: ''
  });
  const [showChart, setShowchart] = useState('hide');

  useEffect(() => {
    Handler.load().then(e => {
      setModel(e);
    })
  }, [])

  return (
    <Layout title="Digit Recognizer" description="MNIST Digit Recognizer using Tensorflow.js" >
      <div className="ds-wrapper">
        <div className="title">
          <h2>Digit Recognizer</h2>
          <p>Using Tensorflow.js to predict handdrawing digits. Model trained on 42.000 MNIST data + Augmentation with 99.62% of accuracy</p>
        </div>
        <div className="content">
          <ReactSketchCanvas
            className="canvas"
            style={{
              width: '250px',
              height: '250px',
              borderRadius: '10px'
            }}
            strokeWidth={25}
            strokeColor="white"
            canvasColor="black"
            ref={canvas}
          />
          <div className={`chart ${isMobile ? showChart : 'show'}`}
            style={{ width: '300px', height: '250px' }}>
            <Bar data={{
              labels: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
              datasets: [{
                label: '# Probabilitiy',
                data: chartdata.prob,
                backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)',
                  'rgba(200, 20, 50, 0.2)',
                  'rgba(100, 150, 50, 0.2)',
                  'rgba(153, 90, 150, 0.2)',
                  'rgba(20, 250, 100, 0.2)',
                ]
              }]
            }} options={{
              maintainAspectRatio: false,
              indexAxis: 'y',
              elements: {
                bar: {
                  borderWidth: 2,
                },
              },
              responsive: true,
              scales: {
                xAxes: [{
                  ticks: {
                    beginAtZero: true
                  }
                }],
                yAxes: [{
                  stacked: true
                }]
              }
            }} ref={chart} />
          </div>

        </div>
        <div className="prediction">
          {chartdata.pred !== '' ? `Prediction : ${chartdata.pred}` : ''}
        </div>
        <div className="button">
          <a onClick={(e) => {
            e.preventDefault();
            canvas.current.exportImage().then((e) => {
              const img = new Image();
              img.src = e;

              img.onload = () => {
                const out = model.predict(Handler.preprocess(img));
                setChartdata({
                  pred: `${out.argMax(1).arraySync()[0]}`,
                  prob: out.arraySync()[0],
                })
              }
            })
          }}>predict</a>
          <a onClick={(e) => {
            e.preventDefault();
            canvas.current.clearCanvas();
            setChartdata({
              pred: '',
              prob: Array(10).fill(0),
            })
          }}>clear</a>
          <a className={`${isMobile ? 'show' : 'hide'}`} onClick={(e) => {
            e.preventDefault();
            setShowchart(showChart === 'hide' ? 'show' : 'hide');
          }}>{showChart === 'hide' ? 'show' : 'hide'} probabilitiy</a>
        </div>
      </div>
    </Layout>
  )
}

export default DigitRecognizer
