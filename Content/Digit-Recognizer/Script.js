function preprocess(img){
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

    return batched.toFloat()
}

function run(model){
    const canvas = document.getElementById("myCanvas");
    const img = preprocess(canvas);
    const out = model.predict(img);

    model.prob = out.arraySync()[0];
    model.pred = out.argMax(1).arraySync()[0];

    document.getElementById("prediction").innerHTML = "Prediction : " + model.pred
} 

function off() {
    document.getElementById("overlay").style.display = "none";
}