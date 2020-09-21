AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'ap-southeast-2:668ff36c-bac5-46f3-84af-d36e3fb590ec',
});


const axios = require('axios')
const cheerio = require('cheerio')

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const myButton = document.getElementById("submit-button");

// var matcher = /^(?:\w+:)?\/\/([^\s\.]+\.\S{2}|localhost[\:?\d]*)\S*$/;
// function isUrl(string){
//   return matcher.test(string);
// }

//Get request the request URL
async function makeGetRequest() {
  //event.preventDefault();
  let url = document.getElementById("searched-url");
  //isUrl(url);
  console.log(url.value) 
  let res = await axios.get(proxyurl + url.value);
  let data = res.data;
  const $ = cheerio.load(data);
 
  // Print some specific page content
  var text2Speech = $('h1').text()
  console.log(text2Speech) 
  const textArticle = document.createElement("div");
  const textnode = document.createTextNode(text2Speech); 
  document.body.appendChild(textArticle);         // Create a text node
  textArticle.appendChild(textnode); 
  const playBut = document.createElement("BUTTON");
  playBut.innerHTML = "Play Me";  
  document.body.appendChild(playBut); 
  return text2Speech;
}

myButton.addEventListener("click", makeGetRequest)

const playButton =  document.getElementById('playBut');
  if (typeof(playButton) != 'undefined' && playButton != null)
  {
    // Exists.
    playButton.addEventListener("click", speakText)
  }

//https://medium.com/@ndaidong/zato-a-powerful-python-based-esb-solution-for-your-soa-5aef67114570

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

      








// // Create an Polly client
// const Polly = new AWS.Polly({
//   signatureVersion: 'v4',
//   region: 'ap-southeast-2'
// });

// const s3 = new AWS.S3({
//   accessKeyId: process.env.AWS_ACCESS_KEY,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
// });


// const textToSpeechConverter = (params, configs) => {
//   Polly.synthesizeSpeech(params, (err, data) => {
//       if (err) {
//           throw err;
//       } else if (data) {
//           if (data.AudioStream instanceof Buffer) {
//               // Read content from the file
//               const fileContent = fs.readFileSync(data.AudioStream);
//                 // Setting up S3 upload parameters
//               const params = {
//                   Bucket: 'polly-test-11234', // pass your bucket name
//                   Key: 'test.mp3', // file will be saved as testBucket/contacts.csv
//                   Body: fileContent
//               };
//               // Uploading files to the bucket
//               s3.upload(params, function(err, data) {
//                   if (err) {
//                       throw err;
//                   }
//                   console.log(`File uploaded successfully. ${data.Location}`);
//               });
//           }
//       }
//   });
// };
//       let params = {
//           'Text': text4Input,
//           'OutputFormat': 'mp3',
//           'VoiceId': voiceId,
//           'TextType': 'ssml'
//       };
//       console.log(params);
//       textToSpeechConverter(params, {});














