# Words-flash
**Link to the website:** https://bomberman1359.github.io/Words-flash/
## Description: 
Words-flash, aka, One Word Kindle, is a speed reading web app that helps people read faster by flashing one word at a time on the screen. You can paste in your own text, upload a PDF, or resume where you left off from something you were reading before. The idea is based on the concept of RSVP (Rapid Serial Visual Presentation), where instead of reading full paragraphs, the reader focuses on one word at a time to avoid moving their eyes around the page. 

The idea was inspired by various genres of Youtube Shorts and Instagram Reels that have utilized this technique to keep the audience engaged. I wanted to build this project because I thought it would be cool and useful to turn big chunks of text into something that’s more digestible and focused. Whenever I try to read ebooks or textbooks, I often get bored and intimidated by the sheer number of texts. I have developed this web app to help alleviate some of those issues. The main objective of this project was to be simple, fun, yet efficient.

## Project Files:
**index.html:** This is the main structure of the site. It contains all the basic elements like the area where you can paste texts, the file upload input for PDFs, the word display section, controls for speed, and the reading history area. It uses standard HTML tags and connects to the other files.

**style.css:** This file controls how everything looks. I styled the word display so it’s clean and centered, added borders for readability, made the buttons look nice, and added some spacing to make the layout more spaced out. 

**script.js:** This is where most of the magic happens. 
It handles:
- Splitting the text into words

- Starting, pausing, and resuming the word display

- Tracking the reading speed

- Estimating how much time is left

- Reading text from PDF files using pdf.js

- Saving and loading reading history using localStorage

- Allowing users to delete individual history entries or clear all of them

## Main Features:
**Text Input:** You can paste in any text you want to read.

**PDF Upload:** Upload a PDF file, and the app will extract the text and turn it into words.

**One Word at a Time Display:** The main feature — words show one at a time at a speed you choose.

**Speed Control:** Set the words per minute speed you want.

**Progress Bar:** See how far you are into the text.

**Estimated Time Remaining:** Shows you know how long the reading will take.

**Reading History:** Remembers what you’ve read, shows your progress, and lets you click to resume or delete.

## Design Choices:
One of the main things I debated was the layout. At first, I put the word display at the very top, but then the code got messed up and everything else felt cluttered. I later decided it made more sense to keep the text input and controls above the word display, so that users set everything up before reading. 

Another big decision was whether to auto-save the progress or not. While figuring out the code was a struggle, I ended up doing it because it’s just way more convenient for users. That way, even if someone closes the tab, their reading is saved and they can come back later.

I also added a button to delete single history items, and one to clear all. I made the individual delete icon a trash can emoji, because it looks friendlier and works well with the rest of the app's simple design.

The styling was also something I went back and forth on. I didn’t want to make it too fancy, but I still wanted it to look clean. I tried to follow spacing and color choices that made things easy to read without being too dull.

## Final Thoughts
If I had more time and coding knowledge, I’d probably add themes (like dark mode), an algorithm to filter out only the important texts (keeping the main texts while removing page numbers, copyright info, etc.), an improved PDF formatting, and perhaps a way to skip to a certain section of the text. But even in its current state, I think it is a full, complex enough project with useful features. I’m proud of how I stuck with it through the design challenges and all the tiny layout issues that came up. 

Thanks for checking it out!

## Video Demo:
