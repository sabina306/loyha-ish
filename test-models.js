import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyCpGLSISNfBUB9MA3_0jZu_OHY7XRLIVLY";

async function runTest() {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`);
    const data = await response.json();
    console.log("Models:", data.models?.map(m => m.name));
}

runTest();
