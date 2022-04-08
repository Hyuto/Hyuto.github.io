function preprocess(img) {
  //convert the image data to a tensor
  const tensor = tf.browser.fromPixels(img, 4).mean(2).toFloat().expandDims(-1);
  //resize to 28 X 28
  const resized = tf.image.resizeBilinear(tensor, [28, 28]).toFloat();
  // Normalize the image
  const offset = tf.scalar(255.0);
  const normalized = resized.div(offset);
  // We add a dimension to get a batch shape
  const batched = normalized.expandDims();

  // Computer Vission
  const canvas = document.getElementById("image");
  tf.browser.toPixels(tensor.div(255.0), canvas);

  return batched.toFloat();
}

function Clear(canvas, canvas2) {
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  canvas2.getContext("2d").clearRect(0, 0, canvas2.width, canvas2.height);
  document.getElementById("prediction").innerHTML = null;
  update_chart(chart, Array(10).fill(0));
}

function run(model) {
  const canvas = document.getElementById("myCanvas");
  const img = preprocess(canvas);
  const out = model.predict(img);

  if (onMobile) {
    off("coveringImage");
  }
  model.prob = out.arraySync()[0];
  model.pred = out.argMax(1).arraySync()[0];

  document.getElementById("prediction").innerHTML = "Prediction : " + model.pred;
  update_chart(chart, model.prob);
}

function off(id) {
  document.getElementById(id).style.display = "none";
}

function On(id) {
  document.getElementById(id).style.display = "block";
}
