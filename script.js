let words = [];
let index = 0;
let interval = null;

function start() {
  const text = document.getElementById("textInput").value;
  words = text.trim().split(/\s+/);
  index = 0;

  const speed = parseInt(document.getElementById("speedInput").value);

  if (interval) clearInterval(interval);

  interval = setInterval(() => {
    if (index < words.length) {
      document.getElementById("wordDisplay").innerText = words[index];
      index++;
    } else {
      clearInterval(interval);
    }
  }, speed);
}

function pause() {
  if (interval) clearInterval(interval);
}

