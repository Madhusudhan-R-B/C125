noseX = 0;
noseY = 0;
difference = 0;
rWX = 0;
lWX = 0;

function setup(){
    video = createCapture(VIDEO);
    video.size(550, 500);

    canvas = createCanvas(550, 550);
    canvas.position(560, 100);

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses)
}

function modelLoaded(){
    console.log('PoseNet is initialised');
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("NoseX = " + noseX + " --- NoseY = " + noseY);

        rWX = results[0].pose.rightWrist.x;
        lWX = results[0].pose.leftWrist.x;
        difference = floor(rWX - lWX);
        console.log("LeftWristX = " + lWX + " --- RightWristX = "+ rWX + " --- Difference = " + difference);
    }
}

function draw(){
    background('#f2c968');
    document.getElementById("square_side").innerHTML = "Width and Height of the square will be = " + difference + "px";
    fill("#00d5ff");
    stroke("#00d5ff");
    square(noseX, noseY, difference);
}