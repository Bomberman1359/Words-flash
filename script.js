let words = [];
let index = 0;
let interval = null;

// PDF Upload handler
document.getElementById("pdfUpload").addEventListener("change", async function () {
  const file = this.files[0];
  if (!file || file.type !== "application/pdf") return;

  const reader = new FileReader();
  reader.onload = async function () {
  const typedarray = new Uint8Array(this.result);

  try {
    const pdf = await pdfjsLib.getDocument(typedarray).promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map(item => item.str).join(" ");
      fullText += pageText + " ";
    }

    // Clean up weird spacing
    fullText = fullText.replace(/\s+/g, ' ').trim();

    document.getElementById("textInput").value = fullText;
  } catch (err) {
    alert("Could not parse PDF. Try a different file.");
    console.error(err);
  }
};


    document.getElementById("textInput").value = fullText.trim();
  };
  reader.readAsArrayBuffer(file);
});

function start() {
  const text = document.getElementById("textInput").value;
  words = text.trim().split(/\s+/);
  index = 0;

  const wpm = parseInt(document.getElementById("wpmInput").value);
  const speed = 60000 / wpm;
  
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

function resume() {
  const wpm = parseInt(document.getElementById("wpmInput").value);
  const speed = 60000 / wpm;

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



