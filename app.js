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
// const Polly = new AWS.Polly({
//   signatureVersion: 'v4',
//   region: 'ap-southeast-2'
// })


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
  let title = $("body h1").text().trim();
  let storyArticle = ['The Title of this article is ' + title ].join(' ');
  story.push(storyArticle);
  $("p").map((_, element) => {
      let text = $(element).text();
      if (text.trim() !== 'Written by') {
          story.push($(element).text());
      }
  });

  //joining the story
  console.log(story.join('').length) 

  //trim story due to free amazon limits to 2999 characters
  const trimmedStory = story.join('').substring(0, 2999)
  console.log(trimmedStory.length)

  const textArticle = document.createElement("div");
  const textnode = document.createTextNode(trimmedStory); 
  main.appendChild(textArticle);         // Create a text node
  textArticle.appendChild(textnode); 
  const playBut = document.createElement("BUTTON");
  playBut.innerHTML = "Play Me";  
  main.appendChild(playBut); 
  playBut.classList.add("btn", "btn-lg", "btn-secondary");

  return trimmedStory;
}

onClickfunc = () => {
  makeGetRequest().then(val => {
      // do something with the value
      let params = {
        OutputFormat: "mp3",
        SampleRate: "16000",
        Text: val,
        TextType: "text",
        VoiceId: "Matthew"
      };
      console.log(params);

      // polly.synthesizeSpeech(params, (err, data) => {
      //   if (err) {
      //     throw err;
      //   } else if (data) {
      //       if (data.AudioStream instanceof Buffer) {
      //         console.log("test");
      //             Fs.writeFile("./test.mp3", data.AudioStream, function(err) {
      //               if (err) {
      //                   return console.log(err)
      //               }
      //               console.log("The file was saved!")
      //           })
      //       }
      //   }
      // });


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









