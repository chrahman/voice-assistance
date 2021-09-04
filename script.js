
// get voice
    var synth = window.speechSynthesis;
    var voiceSelect = document.createElement('select');
    voiceSelect.hidden = 'hidden';
    document.body.appendChild(voiceSelect);
    var voices = [];

    function populateVoiceList() {
      voices = synth.getVoices();
      var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex; //select voice
      voiceSelect.innerHTML = '';
      for(i = 0; i < voices.length ; i++) {
        var option = document.createElement('option');
        option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

        if(voices[i].default) {
          option.textContent += ' -- DEFAULT';
        }

        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
      }
      voiceSelect.selectedIndex = selectedIndex;
    }

    populateVoiceList();
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = populateVoiceList;
    }
//end

// Age calculator
function ageCalculator() {
    //collect input from HTML form and convert into date format
    var userinput ='2021-01-10';
    var dob = new Date(userinput);
    
    //check user provide input or not
    if(userinput==null || userinput==''){
      document.getElementById("message").innerHTML = "**Choose a date please!";  
      return false; 
    } 
    
    //execute if user entered a date 
    else {
    //extract and collect only date from date-time string
    var mdate = userinput.toString();
    var dobYear = parseInt(mdate.substring(0,4), 10);
    var dobMonth = parseInt(mdate.substring(5,7), 10);
    var dobDate = parseInt(mdate.substring(8,10), 10);
    
    //get the current date from system
    var today = new Date();
    //date string after broking
    var birthday = new Date(dobYear, dobMonth-1, dobDate);
    
    //calculate the difference of dates
    var diffInMillisecond = today.valueOf() - birthday.valueOf();

    //convert the difference in milliseconds and store in day and year variable        
    var year_age = Math.floor(diffInMillisecond / 31536000000);
    var day_age = Math.floor((diffInMillisecond % 31536000000) / 86400000);

    //when birth date and month is same as today's date      
    if ((today.getMonth() == birthday.getMonth()) && (today.getDate() == birthday.getDate())) {
            alert("Happy Birthday! to me");
    }
        
     var month_age = Math.floor(day_age/30);        
     day_age = day_age % 30;
        
     var tMnt= (month_age + (year_age*12));
     var tDays =(tMnt*30) + day_age;
     
    //DOB is greater than today?s date, generate an error: Invalid date  
     if (dob>today) {
        alert ("Invalid date input - Please try again!");
     }
     else if (month_age == 0 && year_age == 0) {
        finalage = "My Age is only" + day_age + " days";
     }
     else if (month_age == 0) {
        finalage = "I am" + year_age + " year" + "and" + day_age + " days" + "Old";
     }
     else if (year_age == 0) {
        finalage = "My Age is" + month_age + " months " + "and" + day_age + " days";
     }
     else {
        finalage = "I am" + year_age + " years " + month_age + " months " + day_age + " days" + "Old";
     }
   }
}
ageCalculator();
//end

    var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || false;
    var recognition = new SpeechRecognition();
    var content1 = document.getElementById("transcript");
    var submit1 = document.getElementById("action");
    var welcome = [
      'Welcome back Mr Abdul Raahmaan, How can i help you?',
      'welcome again Mr Abdul Raahmaan, How can i help you?'
    ]
    var greetings = [
      'I am fine, tell me about you',
      'I am good, tell me about you'
    ]
    var weather = [
      'Today weather is in Kassowal punjab pakistan'
    ]
    var myname = [
      'my name is jarvis, speed 2.4 Terabyte.'
    ]
    var owner = [
      'Chaudhry Abdul Raahmaan made me, ' +finalage+ ', without internet i cannot talk with you.',
      'Mr Abdul Raahmaan is the founder of me, ' +finalage+ ', without internet i cannot talk with you.'
    ]
    var robotangry = [
      'Yes i am angry with you. please leave me alone.'
    ]
    var whyangry = [
      'i cannot tell you, please leave me alone'
    ]
    var owsad = [
      'Sir, i think you are sad, as you wish. i am going back, i will see you next time.'
    ]
    var owres = [
      'Good, now how can i help you?'
    ]
    var love = [
      'I Love you to, sir',
	  'I Love you to my friend'
    ]
	var mywork = [
      'I am your online voice assistant. I can open your favorit websites. Like Google, Youtube, Fcebook. And i can tell you about weather, Even i can open your windows update setthings'
    ]


// welcome massege
    window.onload = function() {
      var speech1 = new SpeechSynthesisUtterance();
      var finalText = welcome[Math.floor(Math.random() * welcome.length)];
      speech1.text = finalText;
      speech1.volume = 1;
      speech1.rate = 1;
      speech1.pitch = 1;
      var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
      for(i = 0; i < voices.length ; i++) {
        if(voices[i].name === selectedOption) {
          speech1.voice = voices[i];
          break;
        }
      }
      window.speechSynthesis.speak(speech1);
    }
//end
    function record() {
      if (SpeechRecognition) {
        recognition.lang = "en-US";
        recognition.start();

        recognition.onresult = function (event) {
          content1.value = event.results[0][0].transcript.toLowerCase();

          var speech = new SpeechSynthesisUtterance();
          speech.text = ('Not found in my Database, trying to Search for') + content1.value + (' on google.');
          if (speech.text.includes("open youtube")) {
            window.open("https://www.youtube.com", "_blank");
            speech.text = ('Opening YouTube');
          }
          else if (speech.text.includes("open facebook")) {
            window.open("https://www.facebook.com", "_blank");
            speech.text = ('Opening Facebook');
          }
          else if (speech.text.includes("open google")) {
            window.open("https://www.google.com", "_blank");
            speech.text = ('Opening Google');
          }
          else if (speech.text.includes("windows update")) {
            window.open("ms-settings:windows-update");
            speech.text = ('Opening Windows Update Settings');
          }
          else if (speech.text.includes("editor")) {
            window.open("https://chrahman.github.io/code-editor/", "_blank");
            speech.text = ('Opening Your Code editor');
          }
		  else if (speech.text.includes("editor")) {
            window.open("https://chrahman.github.io/code-editor/", "_blank");
            speech.text = ('Opening Your Code editor');
          }
          else if (speech.text.includes("music chalao")) {
            document.getElementById("myAudio").src = "https://radio.ihostingzone.com/radio/8060/radio.mp3?1586413664";
            document.getElementById("myAudio").play();
            document.getElementById("musicon").classList.add("container");
            speech.text = ('Ok sir, i am trying to play');
          }
          else if (speech.text.includes("psl 6 anthem")) {
            document.getElementById("myAudio").src = "https://busyroute.com/coke-studio-12/songs/groove-mera.mp3";
            document.getElementById("myAudio").play();
            document.getElementById("musicon").classList.add("container");
            speech.text = ('Ok sir, i am trying to play');
          }
          else if (speech.text.includes("psl 5 anthem")) {
            document.getElementById("myAudio").src = "https://busyroute.com/pakistan-super-league-2020/anthems/Tayyar-Ho-Official-Anthem-HBL-Pakistan-Super-League-2020.mp3";
            document.getElementById("myAudio").play();
            document.getElementById("musicon").classList.add("container");
            speech.text = ('Ok sir, i am trying to play');
          }
          else if (speech.text.includes("psl 4 anthem")) {
            document.getElementById("myAudio").src = "https://download936.mediafire.com/lrfprkguqm4g/9k26qkl7mdaf3mx/Ab+Khel+Dewano+Ka.mp3";
            document.getElementById("myAudio").play();
            document.getElementById("musicon").classList.add("container");
            speech.text = ('Ok sir, i am trying to play');
          }
          else if (speech.text.includes("psl 3 anthem")) {
            document.getElementById("myAudio").src = "https://media.hungama.com/c/4/2a9/d0a/33412697/33412697_128.mp3?O5pnztHHAuyMCbjhHi4ELDTkwfU50az3jlivh7a-66Cy3aeZXEIV9smHneAUn8hq_cOP-5Ig0XVQRUZBPjXdGkwIAKoVIvFqp9I2GWj8QdovrDQ-CQaotSx9omQiLimK9y9tFg";
            document.getElementById("myAudio").play();
            document.getElementById("musicon").classList.add("container");
            speech.text = ('Ok sir, i am trying to play');
          }
          else if (speech.text.includes("psl 2 anthem")) {
            document.getElementById("myAudio").src = "https://mp3db.xyz/download?id=4b64763447413141543730&tag=128&name=Ab%20Khel%20Ke%20Dikha%20HBL%20PSL%20Anthem%20Ali%20Zafar%20HD&secret=fKo9hWQbm1YDrsCmSU9New";
            document.getElementById("myAudio").play();
            document.getElementById("musicon").classList.add("container");
            speech.text = ('Ok sir, i am trying to play');
          }
          else if (speech.text.includes("volume badhao")) {
            document.getElementById("myAudio").volume = 1;
            speech.text = ('Set volume on high');
          }
          else if (speech.text.includes("volume thodi karo")) {
            document.getElementById("myAudio").volume = 0.2;
            speech.text = ('Set volume on low');
          }
          else if (speech.text.includes("music band karo")) {
            document.getElementById("myAudio").pause();
            document.getElementById("musicon").classList.remove("container");
            speech.text = ('Music stoped.');
          }
          else if (speech.text.includes("how are you")) {
            var finalText = greetings[Math.floor(Math.random() * greetings.length)];
            speech.text = finalText;
          }
          else if (speech.text.includes("i love you")) {
            var finalText = love[Math.floor(Math.random() * love.length)];
            speech.text = finalText;
          }
          else if (speech.text.includes("tell me about weather")) {
            var finalText = 'Today weather is' +response2+response3+ 'in Kassowal punjab pakistan. The chances of raining are'+response1;
            speech.text = finalText;
          }
          else if (speech.text.includes("what's your name")) {
            var finalText = myname[Math.floor(Math.random() * myname.length)];
            speech.text = finalText;
          }
          else if (speech.text.includes("who is the founder of you")) {
            var finalText = owner[Math.floor(Math.random() * owner.length)];
            speech.text = finalText;
          }
          else if (speech.text.includes("are you angry with me")) {
            var finalText = robotangry[Math.floor(Math.random() * robotangry.length)];
            speech.text = finalText;
          }
          else if (speech.text.includes("why you angry with me")) {
            var finalText = whyangry[Math.floor(Math.random() * whyangry.length)];
            speech.text = finalText;
          }
          else if (speech.text.includes("leave me alone")) {
            var finalText = owsad[Math.floor(Math.random() * owsad.length)];
            speech.text = finalText;
			setTimeout(function(){ var win = window.open("about:blank", "_self"); win.close(); }, 5000);
          }
          else if (speech.text.includes("i am also fine")) {
            var finalText = owres[Math.floor(Math.random() * owres.length)];
            speech.text = finalText;
          }
          else if (speech.text.includes("how much you are old")) {
            speech.text = finalage;
          }
		  else if (speech.text.includes("what you can do for me")) {
           	var finalText = mywork[Math.floor(Math.random() * mywork.length)];
            speech.text = finalText;
          }
          else {
            submit1.submit();
          }
          var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
          for(i = 0; i < voices.length ; i++) {
            if(voices[i].name === selectedOption) {
              speech.voice = voices[i];
              break;
            }
          }
          speech.volume = 1;
          speech.rate = 1;
          speech.pitch = 1;
          window.speechSynthesis.speak(speech);
        };
        recognition.onspeechend = function() {
        recognition.stop();
        }

      }
      else {
        alert("Oh Sorry! Your browser does not support Speech Recognition")
      }

    }

	// Control messages
    recognition.onstart = function() {
      transcript.value = "Speak now, i am listing";
    }
    recognition.onerror = function() {
      transcript.value = "Please check your microphon or try again";
    }
    recognition.onaudioend = function() {
      transcript.value = "Click on White button for talk with me";
    }

// month in words
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];
var today = new Date();
document.getElementById('td').innerHTML = today.getDate();
document.getElementById('tm').innerHTML = monthNames[today.getMonth()];

//weather
var xhr = new XMLHttpRequest();
xhr.responseType = 'document';
xhr.onreadystatechange = function() {
    if (xhr.readyState == XMLHttpRequest.DONE) {
        response1 = xhr.response.querySelector('.precip').textContent;
        response2 = xhr.response.querySelector('.temp .high').textContent;
        response3 = xhr.response.querySelector('.temp .low').textContent;
    }
}
xhr.open('GET', 'https://www.accuweather.com/en/pk/kassowal/260034/daily-weather-forecast/260034', true);
xhr.send(null);
//end

// weak in words
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var d = new Date();
document.getElementById('tw').innerHTML = days[d.getDay()];

// time
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('thm').innerHTML = h + ":" + m;
  document.getElementById('ts').innerHTML = s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
startTime();

// for documentation
function nWin() {
    const winHtml = `<!DOCTYPE html>
    <html>
        <head>
            <title>Doucumention for Voice Assistance</title>
<style>
textarea{
outline:none;
border:none;
overflow:hidden;
resize: none;
}
</style>
        </head>
        <body>
<h1>Speaking Commands:</h1>
<br>
<h2>Ask me these commands</h2>
<li>- How are you</li>
<li>- What&#39;s you name</li>
<li>- How much you are old</li>
<li>- I Love you</li>
<li>- Tell me about weather</li>
<li>- Who is the founder of you</li>
<li>- What you can do for me</li>
<li>- Open Windows Update Settings</li>
<br>
<h2>For Open Websites</h2>
<li>- Open Youtube</li>
<li>- Open Facebook</li>
<li>- Open Blogger</li>
<li>- Open Google</li>
<br>
<h1>For Play Music</h2>
<li>- Music chalao</li>
<li>- Volume thodi karo</li>
<li>- Volume badhao</li>
<li>- Music band karo</li>
            
        </body>
    </html>`;

    const winUrl = URL.createObjectURL(
        new Blob([winHtml], {
            type: "text/html"
        })
    );

    const win = window.open(winUrl);
}