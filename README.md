# offline-chatbot
A simple web app chatbot that answers user questions using a local LLM (Mistral) model with Ollama

### Installation
##### [Ollama](https://ollama.com/download)
Download [Ollama](https://ollama.com/download) 

##### Python Dependencies
Change to the backend directory and install Python dependencies using the following command:
`pip install -r requirements.txt`

##### NPM Dependencies
Change to the frontend directory and install the required dependencies for the frontend using the following command:
`npm install`

### Usage

##### Run Ollama Locally
Download the Mistral model for the chatbot
`ollama pull mistral`
Then start the Ollama server:
`ollama serve`

##### Run the FastAPI backend server
Use uvicorn to host the FastAPI server on local
`uvicorn main:app`
This will start the backend server on localhost:8000

##### Run the React frontend server
Host the frontend server on local
`npm run dev`
This will start the frontend server on localhost:5173

Now by accessing localhost:5173 on a browser, you can see the web app interface and start asking questions to the chatbot.

### Future Features
- Store previous interactions on a database
- User Authentication and Group chat feature with custom commands to query the chatbot
- Allow the chatbot to remember previous interactions to provide better responses
- Add speech-to-text and text-to-speech features to interact with the chatbot via voice
- Add file upload feature to analyse files and perhaps summarize them