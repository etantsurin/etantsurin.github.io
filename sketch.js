let video;
let handpose;
let predictions = [];
let variable;

function setup() {
  // Create video capture from webcam
  video = createCapture(VIDEO);
  video.size(640, 480); // Set video size to match canvas size
  video.hide(); // Hide the video element, we will draw it manually
  frameRate(250);
  
  // Create canvas for drawing
  let canvas = createCanvas(640, 480);
  canvas.parent('canvasContainer'); // Attach canvas to div container
  
  // Load the Handpose model
  handpose = ml5.handpose(video, modelLoaded);
  handpose.on('predict', gotHandposes);
  
  // Select the variable text element
  variable = select('.variable');
}

function modelLoaded() {
  console.log('Handpose model loaded.');
}

function gotHandposes(results) {
  if (results.length > 0) {
    predictions = results;
  }
}

function draw() {
  // Draw video frame onto canvas
  image(video, 0, 0, width, height);
  
  // Display keypoints for each detected hand