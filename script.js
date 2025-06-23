const video = document.getElementById('video');
const result = document.getElementById('result');

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models'),
  faceapi.nets.faceExpressionNet.loadFromUri('https://justadudewhohacks.github.io/face-api.js/models'),
]).then(startVideo);

function startVideo() {
  navigator.mediaDevices.getUserMedia({ video: {} })
    .then(stream => video.srcObject = stream)
    .catch(err => console.error('Webcam error:', err));
}

function detectMood() {
  faceapi.detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
    .withFaceExpressions()
    .then(detection => {
      if (!detection) {
        result.textContent = "No face detected.";
        return;
      }
      const expressions = detection.expressions;
      const mood = Object.entries(expressions).sort((a, b) => b[1] - a[1])[0];
      result.textContent = `Mood: ${mood[0]} (${(mood[1] * 100).toFixed(1)}%)`;
    });
}
