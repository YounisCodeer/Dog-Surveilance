video = "";
objects=[];
status = "";

function preload(){
    video = createVideo("Three_Dogs_Resting_In_A_Park.mp4")
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(status !="")
    {
        objcetDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;
            document.getElementById("speak").innerHTML = "I predict : " + speak;

            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label +" " + percent + "%", objects[i].x + 15,objects[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x, objects[i].width, objects[i].height);
        }
    }
}
function gotResult(error, results){
    if (error) {
        console.log(error);
    }
    console.log(results);
    objcets = results;
}
function start()
{
    objcetDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "status : Detecting Objects"
}

function modelLoaded() {
    console.log("Model Loaded!")
    status = true;
    video.loop();
    video.speed(1)
    video.volume(0)
}
function speak(){
    var synth = window.speechSynthesis;
    speak_data_1 = "The first prediction is " + objectDetector;
    var utterThis = new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}