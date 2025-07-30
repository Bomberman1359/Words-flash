window.onload = function () {
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js';

  let words = [];
  let index = 0;
  let interval = null;

  // PDF upload handler
  document.getElementById("pdfUpload").addEventListener("change", async function () {
    // ...
  });

  window.start = function () {
    const text = document.getElementById("textInput").value;
    words = text.trim().split(/\s+/);
    index = 0;

    const wpm = parseInt(document.getElementById("wpmInput").value);
    const speed = 60000 / wpm;
    
    document.getElementById("progressBar").style.width = "0%";
    document.getElementById("progressText").innerText = `0 / ${words.length} (0%)`;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      if (index < words.length) {
        document.getElementById("wordDisplay").innerText = words[index];

        const progressPercent = Math.floor((index / words.length) * 100);
        document.getElementById("progressBar").style.width = progressPercent + "%";
        document.getElementById("progressText").innerText = `${index + 1} / ${words.length} (${progressPercent}%)`;

        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);


  window.pause = function () {
    if (interval) clearInterval(interval);
  };

  window.resume = function () {
    const wpm = parseInt(document.getElementById("wpmInput").value);
    const speed = 60000 / wpm;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      if (index < words.length) {
        document.getElementById("wordDisplay").innerText = words[index];

        const progressPercent = Math.floor((index / words.length) * 100);
        document.getElementById("progressBar").style.width = progressPercent + "%";
        document.getElementById("progressText").innerText = `${index + 1} / ${words.length} (${progressPercent}%)`;

        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);




