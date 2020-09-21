AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'ap-southeast-2:668ff36c-bac5-46f3-84af-d36e3fb590ec',
});


const axios = require('axios')
const cheerio = require('cheerio')

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const myButton = document.getElementById("submit-button");
const main = document.getElementById("main");


//Get request the request URL
async function makeGetRequest() {
  event.preventDefault();
  let url = document.getElementById("searched-url");

  console.log(url.value) 
  let res = await axios.get(proxyurl + url.value);
  let data = res.data;
  const $ = cheerio.load(data);
 
  // Print some specific page content
  var text2Speech = $('h1').text()
  console.log(text2Speech) 
  const textArticle = document.createElement("div");
  const textnode = document.createTextNode(text2Speech); 
  main.appendChild(textArticle);         // Create a text node
  textArticle.appendChild(textnode); 
  const playBut = document.createElement("BUTTON");
  playBut.innerHTML = "Play Me";  
  main.appendChild(playBut); 
  playBut.classList.add("btn", "btn-lg", "btn-secondary");
  return text2Speech;
}

myButton.addEventListener("click", makeGetRequest)

const playButton =  document.getElementById('playBut');
  if (typeof(playButton) != 'undefined' && playButton != null)
  {
    // Exists.
    playButton.addEventListener("click", speakText)
  }


  // Function invoked by button click
  function speakText() {
    console.log("pp") 
          // Create the JSON parameters for getSynthesizeSpeechUrl
          var speechParams = {
              OutputFormat: "mp3",
              SampleRate: "16000",
              Text: "",
              TextType: "text",
              VoiceId: "Matthew"
          };

          speechParams.Text = text2Speech;
          
          // Create the Polly service object and presigner object
          var polly = new AWS.Polly({apiVersion: '2016-06-10'});
          var signer = new AWS.Polly.Presigner(speechParams, polly)
      
          // Create presigned URL of synthesized speech file
          signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
          if (error) {
              document.getElementById('result').innerHTML = error;
          } else {
              document.getElementById('audioSource').src = url;
              document.getElementById('audioPlayback').load();
              document.getElementById('result').innerHTML = "Speech ready to play.";
          }
        });
      }











