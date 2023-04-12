screenWidth = 0;
screenHeight = 0;
apple.png = empty;
speak_data = empty;
to_number = empty;


function preload(){
    loadImage("apple.png");
}

to_number = Number(content);

if(Number.isInteger(to_number)){
    document.getElementById("status").innerHTML = "Started drawing apple";
    draw_apple = "set";
}
else{
    document.getElementById("status").innerHTML = "The speech has not recognized your number";
}

function setup(){
    screenWidth = window.innerWidth;
    canvas = CreateCanvas(150, 150);
    canvas.position(0, 150)
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
    document.getElementById("textbox").innerHTML = "";
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