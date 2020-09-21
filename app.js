const axios = require('axios')
const cheerio = require('cheerio')

const proxyurl = "https://cors-anywhere.herokuapp.com/";

const myButton = document.getElementById("submit-button");


//Get request the request URL
async function makeGetRequest() {

  let url = document.querySelector("searched-url");

  let res = await axios.get(proxyurl + url);

  let data = res.data;
  const $ = cheerio.load(data);
  // Print the full HTML
  //console.log(`Site HTML: ${$.html()}\n\n`)

  // Print some specific page content
  console.log(`First h1 tag: ${$('h1').text()}`) 
  console.log(`pp`) 
}
//makeGetRequest();

myButton.addEventListener("click", makeGetRequest)
//makeGetRequest("https://goo.gl/MV8Tkh");

//https://medium.com/@ndaidong/zato-a-powerful-python-based-esb-solution-for-your-soa-5aef67114570



















