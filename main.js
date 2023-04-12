x = 0;
y = 0;
screenWidth = 0;
screenHeight = 0;
apple = "";
speak_data = "";
to_number = 0;


function preload(){
    loadImage("apple.png");
}

var SpeechRecognition = window.webkitSpeechRecognition;
  
var recognition = new SpeechRecognition();

to_number = Number(content);

recognition.onresult = function(event){ 

console.log(event); 
  
var content = event.results[0][0].transcript;

document.getElementById("status").innerHTML = "The Speech has been recognized as: " + content; 

if(Number.isInteger(to_number)){
    document.getElementById("status").innerHTML = "Started drawing apple";
    draw_apple = "set";
}
else{
    document.getElementById("status").innerHTML = "The speech has not recognized your number";
}
} 


function setup(){
    screenWidth = window.innerWidth;
    canvas = CreateCanvas(150, 150);
    canvas.position(0, 150)
    canvas.center;
}

function draw(){
    if(draw_apple == "set"){
        for(var i = 1; i <= to_number; i++){
            x = Math.floor(Math.random() * 700);
            y = Math.floor(Math.random() * 900);
            image(apple, x, y, 50, 50);
        }
        document.getElementById("status").innerHTML = to_number + "Apples Drawn";
    }
}

function take_snapshot(){
    console.log(img_id);

    Webcam.snap(function(data_uri){
        if(image_id=="selfie1"){
            document.getElementById("result1").innerHTML = '<img id="selfie1" src="'+data_uri+'"/>';
        }
        
        if(image_id=="selfie2"){
            document.getElementById("result2").innerHTML = '<img id="selfie2" src="'+data_uri+'"/>';
        }

        if(image_id=="selfie3"){
            document.getElementById("result3").innerHTML = '<img id="selfie3" src="'+data_uri+'"/>';
        }
    });
}

function start(){
    document.getElementById("status").innerHTML = "System is listening: Please Speak";
    recognition.start();
}

setTimeout(function(){
    img_id = "selfie1";
    take_snapshot();
    speak_data = "Taking your Selfie in 5 seconds!";
    synth.speak(utterThis);
    var utterThis = new SpeechSynthesisUtterance(speak_data);
}, 5000);

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_image").src;
    link.href = image;
    link.click();
}

function speak(){
    var synth = window.SpeechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data = "";
}