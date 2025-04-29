const crypto = require("crypto");
const fs = require("node:fs");
const readline = require("node:readline");
const { YoutubeTranscript } = require("youtube-transcript");
const { GoogleGenerativeAI } = require("@google/generative-ai");

require("dotenv").config();

const input = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

input.question("Video URL to summarize: ", (url) => {
  if (!isYouTubeUrl(url)) {
    console.error("Invalid URL. Please enter a valid YouTube URL.");
    input.close();
    return;
  }

  input.question("Enter your preferred language (e.g., en, pt, es): ", async (lang) => {
    await fetchTranscript(url, lang);
    input.close();
  });
});

function isYouTubeUrl(url) {
  const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]{11}$/;
  return youtubeRegex.test(url);
}

async function fetchTranscript(videoUrl, lang) {
  try {
    const uuid = crypto.randomUUID().substring(0, 6);
    const transcript = await YoutubeTranscript.fetchTranscript(videoUrl);
    const transcriptText = transcript.map((entry) => entry.text).join(" ");

    const summary = await summarizeTranscript(transcriptText, lang);

    fs.mkdirSync("src/summaries", { recursive: true });

    const path = `src/summaries/summary-${uuid}.txt`;
    fs.writeFileSync(path, summary);

    console.log(`✅ Summary saved in ${path}`);
  } catch (error) {
    console.error("❌ Error fetching transcript:", error);
  }
}

async function summarizeTranscript(transcriptText, lang) {
  const genAI = new GoogleGenerativeAI(process.env.API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-preview-04-17" });

  const prompt = `
You are a professional summarizer AI. Given the transcript of a YouTube video, generate a detailed summary in ${lang}.
The summary should be clear, well-structured, and include all important points, arguments, examples, or insights presented in the video.
Avoid intros like "Here is a summary". Do not include the word "Transcript".
Keep the summary long enough to capture the depth of the content, but still readable and to the point.

Text:
"""
${transcriptText}
"""
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text().trim();
}
