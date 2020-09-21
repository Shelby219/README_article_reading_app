const axios = require('axios')
const cheerio = require('cheerio')

// function fetchHTML(url) {
//     const data = axios.get(url)
//    //.then(response => console.log(response.data))
//    console.log(cheerio.load(data))
// }

// const $ = fetchHTML("https://goo.gl/MV8Tkh")

// // Print the full HTML
// console.log(`Site HTML: ${$.html()}\n\n`)

// // Print some specific page content
// console.log(`First h1 tag: ${$('h1').text()}`)



const {
    extract 
  } = require('article-parser');
   
  const url = 'https://goo.gl/MV8Tkh';
   
  extract(url).then((article) => {
    const $ = cheerio.load(article.content);
    let h2 = $('h2').text();
    console.log(h2)
    let p = $('p').text();
    console.log(p)
    
  }).catch((err) => {
    console.log(err);
  });



