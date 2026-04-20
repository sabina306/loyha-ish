import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyCpGLSISNfBUB9MA3_0jZu_OHY7XRLIVLY";
const genAI = new GoogleGenerativeAI(API_KEY);

async function runTest() {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("hello");
        console.log("Success with 1.5:", result.response.text());
    } catch (e) {
        console.error("Error with 1.5:", e.message);
    }
}

runTest();
