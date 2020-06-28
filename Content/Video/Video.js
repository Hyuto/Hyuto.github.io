function start(){
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (stream) {
                let {width, height} = stream.getTracks()[0].getSettings();
                document.getElementById("container").style.width = `${width}px`;
                document.getElementById("container").style.height = `${height}px`;
                document.getElementById("videoElement").style.width = `${width}px`;
                document.getElementById("videoElement").style.height = `${height}px`;
                video.srcObject = stream;
                document.getElementById("Size").innerHTML = `Your Camera Ressolution is ${width} x ${height}`
            })
            .catch(function (err0r) {
                alert("Something went wrong!");
            }
        );
    }
}

function stop(e) {
    var stream = video.srcObject;
    var tracks = stream.getTracks();

    for (var i = 0; i < tracks.length; i++) {
        var track = tracks[i];
        track.stop();
    }

    video.srcObject = null;
    document.getElementById("Size").innerHTML = null
    document.getElementById("container").style.width = `400px`;
    document.getElementById("container").style.height = `400px`;
    document.getElementById("videoElement").style.width = `400px`;
    document.getElementById("videoElement").style.height = `400px`;
}