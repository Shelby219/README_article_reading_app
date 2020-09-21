AWS.config.region = 'ap-southeast-2'; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
IdentityPoolId: 'ap-southeast-2:668ff36c-bac5-46f3-84af-d36e3fb590ec',
});


const axios = require('axios')
const cheerio = require('cheerio')

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const myButton = document.getElementById("submit-button");
const main = document.getElementById("main");
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














