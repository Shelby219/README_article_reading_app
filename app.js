AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'ap-southeast-2:668ff36c-bac5-46f3-84af-d36e3fb590ec',
});


const axios = require('axios')
const cheerio = require('cheerio')
const Fs = require('fs')


const proxyurl = "https://cors-anywhere.herokuapp.com/";

const myButton = document.getElementById("submit-button");
const main = document.getElementById("main");


// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'ap-southeast-2'
})


//Get request the request URL
async function makeGetRequest() {
  event.preventDefault();
  let url = document.getElementById("searched-url");

  console.log(url.value) 
  let res = await axios.get(proxyurl + url.value);
  let data = res.data;
  const $ = cheerio.load(data);
 
  // Print some specific page content
  //var text2Speech = $('article').text()
  let story = [];
  let title = $("body h1").text().trim();
  let storyArticle = ['The Title of this article is ' + title ].join(' ');
  story.push(storyArticle);
  $("p").map((_, element) => {
      let text = $(element).text();
      if (text.trim() !== 'Written by') {
          story.push($(element).text());
      }
  });

  console.log(story.join('').length) 
  //trim story due to free amazon limits
  let trimmedStory = story.join('').substring(0, 2999)
  console.log(trimmedStory.length)

  
  const textArticle = document.createElement("div");
  const textnode = document.createTextNode(trimmedStory); 
  main.appendChild(textArticle);         // Create a text node
  textArticle.appendChild(textnode); 
  const playBut = document.createElement("BUTTON");
  playBut.innerHTML = "Play Me";  
  main.appendChild(playBut); 
  playBut.classList.add("btn", "btn-lg", "btn-secondary");

  let params = {
    OutputFormat: "mp3",
    SampleRate: "16000",
    Text: trimmedStory,
    TextType: "text",
    VoiceId: "Matthew"
};
//console.log(params);
  textToSpeechConverter(params, {});

}

myButton.addEventListener("click", makeGetRequest)

const playButton =  document.getElementById('playBut');
  if (typeof(playButton) != 'undefined' && playButton != null)
  {
    // Exists.
    playButton.addEventListener("click", speakText)
  }


const textToSpeechConverter = (params, configs) => {
    Polly.synthesizeSpeech(params, (err, data) => {
        if (err) {
          throw err;
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
              console.log("params");
                // Read content from the file
                Fs.writeFile("./speech.mp3", data.AudioStream, function(err) {
                  if (err) {
                      return console.log(err)
                  }
                  console.log("The file was saved!")
              })
            }
        }
    });
};



  // // Function invoked by button click
  // function speakText() {
  //   console.log("pp") 
  //         // Create the JSON parameters for getSynthesizeSpeechUrl
  //         var speechParams = {
  //             OutputFormat: "mp3",
  //             SampleRate: "16000",
  //             Text: "",
  //             TextType: "text",
  //             VoiceId: "Matthew"
  //         };

  //         speechParams.Text = story;
          
  //         // Create the Polly service object and presigner object
  //         var polly = new AWS.Polly({apiVersion: '2016-06-10'});
  //         var signer = new AWS.Polly.Presigner(speechParams, polly)
      
  //         // Create presigned URL of synthesized speech file
  //         signer.getSynthesizeSpeechUrl(speechParams, function(error, url) {
  //         if (error) {
  //             document.getElementById('result').innerHTML = error;
  //         } else {
  //             document.getElementById('audioSource').src = url;
  //             document.getElementById('audioPlayback').load();
  //             document.getElementById('result').innerHTML = "Speech ready to play.";
  //         }
  //       });
  //     }











