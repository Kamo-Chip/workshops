// https://platform.openai.com/docs/api-reference/introduction

const OPENAI_API_KEY =
  "YOUR_API_KEY";

// Text generation
document.getElementById("send").onclick = async function () {
  const prompt = document.getElementById("prompt").value;
  const responseDiv = document.getElementById("response");
  responseDiv.textContent = "Loading...";

  const endpoint = "https://api.openai.com/v1/responses";

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1",
        input: prompt,
      }),
    });
    const data = await res.json();
    console.log(data);
    responseDiv.textContent = data.output[0].content[0].text || "No response.";
  } catch (err) {
    responseDiv.textContent = "Error: " + err.message;
  }
};

// Image generation
const generateBtn = document.getElementById("generate-image");
const imagePromptEl = document.getElementById("image-prompt");
const imageEl = document.getElementById("generated-image");

generateBtn.onclick = async function () {
  const prompt = imagePromptEl.value;
  imageEl.src = "";
  generateBtn.textContent = "Generating...";
  try {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "dall-e-2",
        prompt,
        size: "1024x1024",
      }),
    });
    const data = await res.json();
    console.log(data);
    if (data.data && data.data[0]) {
      if (data.data[0].b64_json) {
        imageEl.src = `data:image/png;base64,${data.data[0].b64_json}`;
      } else if (data.data[0].url) {
        imageEl.src = data.data[0].url;
      } else {
        alert('No image returned.');
      }
    } else {
      alert('No image returned.');
    }
  } catch (err) {
    alert('Error: ' + err.message);
  } finally {
    generateBtn.textContent = "Generate Image";
  }
};
