# 📽️ YouTube Video Summarizer

You can utilize this simple CLI program to get the summary of any YouTube video. It retrieves the transcript of the video using Gemini AI and provides you with a summary.

## 🚀 Features

- Command-line interface (CLI) - Fetches transcripts from YouTube videos 

- Gemini API provides the summary

- Saves summaries as `.txt` files with unique IDs

- Multiple language support

## 📦 Setup

```bash
git clone https://github.com/your-user/youtube-video-summarizer
cd youtube-video-summarizer
npm install
```

## 🔑 API Key

Create a .env file as per the given template .env.example before starting the project:

```env
API_KEY="your-gemini-api-key-here"
```
To obtain your Gemini API key, visit [https://aistudio.google.com/u/5/apikey](https://aistudio.google.com/u/5/apikey).

## ▶️ Run

```bash
npm start
```

## ⚠️ Warning 
Please note, an unofficial approach is implemented in this project to retrieve YouTube video transcripts. If YouTube updates its internal APIs, this may cease functioning.
