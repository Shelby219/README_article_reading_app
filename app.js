const axios = require('axios')
const cheerio = require('cheerio')
const AWS = require('aws-sdk');

 
 
 // Initialize the Amazon Cognito credentials provider
  AWS.config.region = 'ap-southeast-2'; // Region
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({   
  IdentityPoolId: 'ap-southeast-2:668ff36c-bac5-46f3-84af-d36e3fb590ec',
  });




const proxyurl = "https://cors-anywhere.herokuapp.com/";

const myButton = document.getElementById("submit-button");
const main = document.getElementById("main");
const articleURL = document.getElementById("articleURL");

// Create the Polly service object and presigner object
var polly = new AWS.Polly({apiVersion: '2016-06-10'});



//Get request the request URL
async function makeGetRequest() {
  event.preventDefault();
  let url = document.getElementById("searched-url");

  //console.log(url.value)  
   // Using the URL parameters to get the data from the page
  let res = await axios.get(proxyurl + url.value);
  let data = res.data;
  const $ = cheerio.load(data);
 
  // Print some specific page content
  let story = [];
  let title = $("body h1").first().text().trim();
  let storyArticle = ['The Title of this article is ' + title ].join(' ');
  story.push(storyArticle);
  $("p").map((_, element) => {
      let text = $(element).text();
      if (text.trim() !== 'Written by') {
          story.push($(element).text());
      }
  });
   console.log(story.join(''))
  //joining the story
  //console.log(story.join('').length) 

  //trim story due to free amazon limits to 2999 characters
  const trimmedStory = story.join('').substring(0, 2999)
  //console.log(trimmedStory.length)
   
  const textArticle = document.createElement("div");
  const textnode = document.createTextNode(storyArticle); 
  main.appendChild(textArticle);         // Create a text node
  textArticle.appendChild(textnode); 


  articleURL.innerHTML = "Here is your Audio Link!"

  return trimmedStory;
}


onClickfunc = () => {
  makeGetRequest().then(val => {
      // after the get request function, then after that is resolved it will return the trimmed text
      let params = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: val,
        TextType: "text",
        VoiceId: "Matthew",
        Engine: 'neural'
      };
    console.log(params);

  //PUT YOUR CODE HERE FOR THE TEXT TO SPEECH CONVERSION
    const signer = new AWS.Polly.Presigner(params, polly)
    // Create presigned URL of synthesized speech file
        signer.getSynthesizeSpeechUrl(params, function(error, url) {
          if (error) {
              document.getElementById('result').innerHTML = error;
          } else {
              document.getElementById('audioSource').src = url;
              articleURL.href = url;
              document.getElementById('audioPlayback').load();
              document.getElementById('result').innerHTML = "Article ready to play!";
              console.log(url)
          }})
      return val;
    })

//PUT YOUR CODE HERE FOR THE UPLOADED FILE TO s3
// This is the way we can send big files to Amazon S3.
    .then(val => {
     




      
    })
}



//button that submits the URL for processing
myButton.addEventListener("click", onClickfunc)


//code that shows the play button
const playButton =  document.getElementById('playBut');
  if (typeof(playButton) != 'undefined' && playButton != null)
  {
    // Exists.
    playButton.addEventListener("click", speakText)
  }









