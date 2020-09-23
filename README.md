# ReadME
## Ben Rochlin & Shelby El-rassi, Flex-track 2020

![Man-Reading Newspape](images.jpeg)

## Problem to be solved?
Reading through Medium? The News? Other Articles? Ads getting in the way, or you simply do not have time to sit and read the whole thing? ReadMe is the article reading service you need. By inputting the URL the audio will be output ready to listen.  

## What is ReadMe?
ReadMe is an 'article reading service' in which a user inputs a link to an article and ReadMe website converts the text from the article to audio and outputs a file that can either be downloaded or streamed  directly from the site.

## How it works?
- User can input a URL into the search 
- When loading an loading bar will appear
- Axios will then get the URL
- Cheerio will scrape the article headings and text from the page and input them into a variable (trimmed to 2999 characters due to free limits on AWS)
- Using parameters given (including the text) Amazon Polly will then Synthesize the text into the HTML Audio player for output
- Amazon Polly will also process the URL into a clickable link
- The Article Title Will Output for reference
- Notification for ready to play

## Future Features
- User being able to input their email address for the file to be sent to them
- Fine tuning of the text scraping so most articles would be compatible(Node Module Puppeteer would allow for this, however can only be used on a server)
- The output file being a downloadable audio file
- Settings Page: Choose Voice, speaking speed and other optional parameters

## Technologies Used
- Axios
- Cheerio
- Browserify
- AWS SDK
    - Amazon Polly
    - Amazon S3
- Heroku CORS Anywhere
- HTML
- CSS
- JavaScript
- jQuery


## Screenshots

![Screen Shot](Shot1.png)
![Screen Shot](Shot2.png)


## Credit

Example Article: https://medium.com/@ndaidong/zato-a-powerful-python-based-esb-solution-for-your-soa-5aef67114570