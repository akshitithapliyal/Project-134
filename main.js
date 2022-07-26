img="";
object=[];
status="";

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function preload(){
    song = loadSound ("alarm.mp3")
}

function setup(){
    canvas = createCanvas(380, 380);
    canvas.center();
    video= createCapture(VIDEO);
    video.size(380,380);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("model is loaded and starting");
    status=true;
    objectDetector.detect(video, gotresults);
}

function gotresults(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    object=results;
}

function draw(){
    image(video, 0, 0, 380, 380);
    if(status!=""){
        objectDetector.detect(video, gotresults);
for(i=0;i<object.length;i++){
    document.getElementById("status").innerHTML = "Status : Detected Objects";
    fill(130, 200, 40);
    percent=floor(object[i].confidence*100);
    text(object[i].label+" "+percent+" %",object[i].x+15,object[i].y+15);
    noFill();
    stroke(230, 99, 100);
    rect(object[i].x,object[i].y,object[i].width,object[i].height);
    if(object[i].label == "person"){
        document.getElementById("number_of_objects").innerHTML = "Baby Found";
        song.stop();
    } else {
        document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        song.play();
    }
    
}
if(object.length == 0){
    document.getElementById("number_of_objects").innerHTML = "Baby Not Found";
        song.play();
}
}
}