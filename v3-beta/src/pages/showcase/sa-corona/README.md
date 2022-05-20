# Sentiment Detector Based on Corona Topic in DKI Jakarta

![javascript](https://img.shields.io/badge/javascript-white?logo=javascript)
![react](https://img.shields.io/badge/React-white?logo=react)
![onnxruntime-web](https://img.shields.io/badge/onnxruntime--web-white?logo=onnx&logoColor=black)

Digit Recognizer application built with `tensorflow.js`.

## Used Technology

1. React
2. Chart.js & react-chartjs-2
3. sastrawi.js
4. onnxruntime-web (`wasm` backend)

## Repository

Visit my repository to access all data related to this project.

[![github](https://img.shields.io/badge/Project_Repository-black?logo=github)](https://github.com/Hyuto/Analisis-Sentimen-Corona-DKI-Jakarta)

## Models

|                      |                                                                          Link                                                                          |
| :------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------: |
| `onnx` model         | [![Github](https://img.shields.io/badge/Github-black?logo=github)](https://github.com/Hyuto/Hyuto.github.io/tree/master/v3-beta/static/model/sa-model) |
| `scikit-learn` model |  [![Github](https://img.shields.io/badge/Github-black?logo=github)](https://github.com/Hyuto/Analisis-Sentimen-Corona-DKI-Jakarta/tree/master/model)   |

## Step to reproduce

1. Build decent model using `scikit-learn` module
2. Convert model to `onnx` model using `skl2onnx` module
3. Deploy `onnx` model on `onnxruntime-web` environment
