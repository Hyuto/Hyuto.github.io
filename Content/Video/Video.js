function start(){
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({video: {width: 9999}})
        .then(function (stream) {
            video.srcObject = stream;
            video.onloadedmetadata = (event) => {
                document.getElementById("container").style.width = `${video.videoWidth}px`;
                document.getElementById("container").style.height = `${video.videoHeight}px`;
                document.getElementById("videoElement").style.width = `${video.videoWidth}px`;
                document.getElementById("videoElement").style.height = `${video.videoHeight}px`;
                document.getElementById("Size").innerHTML = `Your Camera Ressolution is ${video.videoWidth} x ${video.videoHeight}`;
            }}
        ).catch(function(e){
            navigator.mediaDevices.getUserMedia({video : true})
            .then(function (stream) {
                video.srcObject = stream;
                video.onloadedmetadata = (event) => {
                    document.getElementById("container").style.width = `${video.videoWidth}px`;
                    document.getElementById("container").style.height = `${video.videoHeight}px`;
                    document.getElementById("videoElement").style.width = `${video.videoWidth}px`;
                    document.getElementById("videoElement").style.height = `${video.videoHeight}px`;
                    document.getElementById("Size").innerHTML = `Your Camera Ressolution is ${video.videoWidth} x ${video.videoHeight}`;
                }
            })
            .catch(function (err) {
                alert(`${err}`);
            });
        })
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

var video = document.querySelector("#videoElement");
var startVideo = document.querySelector('#start');
var stopVideo = document.querySelector('#stop');

startVideo.addEventListener("click", start, true);
stopVideo.addEventListener("click", stop, false);