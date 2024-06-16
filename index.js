// Import necessary modules
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
import chalk from "chalk";
import readlineSync from "readline-sync";

// Load environment variables from .env file
dotenv.config();

// Set your Gemini API key
const gemini_api_key = process.env.GEMINI_API_KEY;
console.log(gemini_api_key);

// Create a new instance of GoogleGenerativeAI using the Gemini API key
const genAI = new GoogleGenerativeAI(gemini_api_key);

// Get the Gemini 1.5 generative model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Start a chat session with the generative model
const chat = model.startChat({
    generationConfig: {
        maxOutputTokens: 100,
    },
});

// Clear the console
console.clear();

// Print a ChatGenie ASCII art
console.log(
    chalk.whiteBright(`
   ____  _             _     ____               _       
  / ___|| |__    __ _ | |_  / ___|  ___  _ __  (_)  ___ 
 | |    | '_ \\  / _\` || __|| |  _  / _ \\| '_ \\ | | / _ \\
 | |___ | | | || (_| || |_ | |_| ||  __/| | | || ||  __/
  \\____||_| |_| \\__,_| \\__| \\____| \\___||_| |_||_| \\___|                                                          
  `)
  );

// Start an infinite loop to interact with the chatbot
while (true) {
    // Prompt the user for input
    const userContent = readlineSync.question(chalk.cyan("User: "));

    // Check if the user wants to exit the chat
    if (userContent.toLowerCase() === "exit") {
        console.log(chalk.red("ChatGenie: ") + " Goodbye!");
        break;
    }

    // Send user input to the chatbot and wait for the response
    try {
        const result = await chat.sendMessage(userContent);
        const response = result.response;
        const aiMessage = response.text();

        // Print the chatbot's response
        console.log(chalk.red("ChatGenie: ") + aiMessage);
    } catch (error) {
        // Handle any errors that occur during the chat
        console.error(chalk.red("Error:"), error.message);
        break;
    }
}
