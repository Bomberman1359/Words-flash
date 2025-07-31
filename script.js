window.onload = function () {
  pdfjsLib.GlobalWorkerOptions.workerSrc =
    "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.min.js";

  let words = [];
  let index = 0;
  let interval = null;

  // === RENDER HISTORY ===
  function renderHistory() {
    const historyContainer = document.getElementById("historyList");
    if (!historyContainer) return;

    historyContainer.innerHTML = "";

    const keys = Object.keys(localStorage).filter((key) =>
      key.startsWith("reading_")
    );
    if (keys.length === 0) {
      historyContainer.innerText = "No history yet.";
      return;
    }

    keys.sort().reverse();

    keys.forEach((key) => {
      const item = JSON.parse(localStorage.getItem(key));
      const percent = Math.floor((item.index / item.total) * 100);

      const div = document.createElement("div");
      div.className = "history-item";
      div.innerText = `${item.title} — ${percent}% read`;

      div.addEventListener("click", () => loadReadingFromHistory(item));

      historyContainer.appendChild(div);
    });
  }

  // === PDF Upload Handler ===
  document
    .getElementById("pdfUpload")
    .addEventListener("change", async function () {
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
            const pageText = textContent.items.map((item) => item.str).join(" ");
            fullText += pageText + " ";
          }

          fullText = fullText.replace(/\s+/g, " ").trim();
          document.getElementById("textInput").value = fullText;
        } catch (err) {
          alert("Could not parse PDF. Try a different file.");
          console.error(err);
        }
      };
      reader.readAsArrayBuffer(file);
    });

  // === START ===
  window.start = function () {
    const text = document.getElementById("textInput").value;
    words = text.trim().split(/\s+/);
    if (words.length === 0) return;

    index = 0;
    const title = prompt("Enter a name for this reading:") || "Untitled";
    const id = Date.now().toString();

    localStorage.setItem(
      "reading_" + id,
      JSON.stringify({
        id,
        title,
        content: text.trim(),
        index: 0,
        total: words.length,
      })
    );

    renderHistory();

    startReading();
  };

  // === RESUME ===
  window.resume = function () {
    if (words.length === 0) return;
    startReading();
  };

  // === PAUSE ===
  window.pause = function () {
    if (interval) clearInterval(interval);
  };

  // === LIVE WPM ADJUST ===
  document
    .getElementById("wpmInput")
    .addEventListener("input", function () {
      if (interval) {
        clearInterval(interval);
        startReading();
      }
    });

  // === LOAD FROM HISTORY ===
  function loadReadingFromHistory(item) {
    document.getElementById("textInput").value = item.content;
    words = item.content.split(/\s+/);
    index = item.index || 0;
    document.getElementById("wordDisplay").innerText = words[index] || "";
    startReading(item);
  }

  // === ACTUAL READING FUNCTION ===
  function startReading(historyItem = null) {
    const wpm = parseInt(document.getElementById("wpmInput").value);
    const speed = 60000 / wpm;

    if (interval) clearInterval(interval);

    interval = setInterval(() => {
      if (index < words.length) {
        document.getElementById("wordDisplay").innerText = words[index];

        const progressPercent = Math.floor((index / words.length) * 100);
        document.getElementById("progressBar").style.width =
          progressPercent + "%";
        document.getElementById("progressText").innerText = `${
          index + 1
        } / ${words.length} (${progressPercent}%)`;

        const timeRemaining = Math.round((words.length - index - 1) * (speed / 1000));
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById("timeLeft").innerText =
          `Estimated time left: ${minutes}:${seconds.toString().padStart(2, "0")}`;

        index++;

        // Save history position
        if (historyItem) {
          historyItem.index = index;
          localStorage.setItem("reading_" + historyItem.id, JSON.stringify(historyItem));
        }
      } else {
        clearInterval(interval);
        document.getElementById("timeLeft").innerText = `Estimated time left: 0:00`;
      }
    }, speed);
  }

  // Initial history render
  renderHistory();
};
