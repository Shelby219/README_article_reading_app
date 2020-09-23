const axios = require('axios')
const cheerio = require('cheerio')
const AWS = require('aws-sdk');

 
// Initialize the Amazon Cognito credentials provider
AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({   
IdentityPoolId: 'ap-southeast-2:668ff36c-bac5-46f3-84af-d36e3fb590ec',
});

//enables no issues with CORS
const proxyurl = "https://cors-anywhere.herokuapp.com/";

//getting certain elements
const myButton = document.getElementById("submit-button");
const main = document.getElementById("main");
const articleURL = document.getElementById("articleURL");
const spinnerLoad = document.getElementById("spinny-loader");

// Create the Polly service object and presigner object
const polly = new AWS.Polly({apiVersion: '2016-06-10'});

//Get request the request URL
async function makeGetRequest() {
  //event.preventDefault();
  //adding the spinner class from bootstrap on for a loading bar
  spinnerLoad.classList.add("spinner-border")
  let url = document.getElementById("searched-url");
  
// Using the URL parameters to get the data from the page
  let res = await axios.get(proxyurl + url.value);
  let data = res.data;
  const $ = cheerio.load(data);
 
// Print some specific article content
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
  // console.log(story.join(''))
 
  //trim story due to free amazon limits to 2999 characters
  const trimmedStory = story.join('. ').substring(0, 2999)
  console.log(trimmedStory)
   
  //removing the spinner class from bootstrap on for a loading bar$
  spinnerLoad.classList.remove("spinner-border")
   //appending the title to the webpage
  const textArticle = document.createElement("div");
  const textnode = document.createTextNode(storyArticle); 
  main.appendChild(textArticle);         // Create a text node
  textArticle.appendChild(textnode); 

  //audio link alert
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

const signer = new AWS.Polly.Presigner(params, polly)
    // Create presigned URL of synthesized speech file
        signer.getSynthesizeSpeechUrl(params, function(error, url) {
          if (error) {
              document.getElementById('result').innerHTML = error;
          } else {
            //putting the audio into the HTML audio elements for playing
              document.getElementById('audioSource').src = url;
              //apending the URL link to page
              articleURL.href = url;
              document.getElementById('audioPlayback').load();
              document.getElementById('result').innerHTML = "Article ready to play!";
             // console.log(url)
          }})

//THIS IS FOR FUTURE CODE OUTPUTTING TO s3
        // let paramsss = {
        //     OutputFormat: 'mp3', 
        //     OutputS3BucketName: 'pollystorage', 
        //     Text: val,
        //     VoiceId: 'Joanna', 
        //     Engine: 'neural'
        //     };
        //     polly.startSpeechSynthesisTask(paramsss, function taskID(err, data) {
        //     if (err) console.log(err, err.stack); // an error occurred
        //     else    console.log(data)
        //     return data.SynthesisTask.TaskId
        //     });
        //     console.log(taskID())

      //return taskID();

//THIS IS FOR FUTURE CODE OUTPUTTING TO s3
//     }).then(taskID => {
//       // setTimeout(function(){
//       // let paramssss = {TaskId: taskID}
//       // polly.getSpeechSynthesisTask(paramssss, function(err, data) {
//       //         if (err) console.log(err, err.stack); // an error occurred
//       //         else     console.log(data);
//       //         status = data.SynthesisTask.TaskStatus;
//       //             console.log(status)
//       //         return status;
//       //       })
//       //     }, 5000);
  })
}

//button that submits the URL for processing
myButton.addEventListener("click", onClickfunc)











