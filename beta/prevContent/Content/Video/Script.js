function preprocess(img){
    //convert the image data to a tensor 
    const tensor = tf.browser.fromPixels(img, 4)//.mean(2).toFloat().expandDims(-1);
    //resize to 28 X 28
    const resized = tf.image.resizeBilinear(tensor, [200, 200]).toFloat();
    // Normalize the image 
    const offset = tf.scalar(255.0);
    const normalized = resized.div(offset);
    // We add a dimension to get a batch shape
    const batched = normalized.expandDims(); 

    // Computer Vission
    const canvas = document.getElementById("image");
    tf.browser.toPixels(tensor.div(255.0), canvas);

    //return batched.toFloat()
}