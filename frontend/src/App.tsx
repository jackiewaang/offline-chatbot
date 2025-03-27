import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useState } from "react"
import { Input } from "./components/ui/input"
import axios from "axios"

function App() {

  const [messages, setMessages] = useState<{ sender: string, text: string } []>([])
  const [input, setInput] = useState<string>("")
  const [waiting, setWaiting] = useState<boolean>(false)

  const handleSend = () => {
    setMessages((prev) => [
      ...prev,
      { sender: "You", text: input}
    ])
    const question = input
    setInput("")
    setWaiting(true)
    askQuestion(question)
  }

  const askQuestion = async (question: string) => {
    try {
      const response = await axios.post(`http://localhost:8000/chat?query=${question}`)
      const answer:string = response.data
      setMessages((prev) => [...prev, { sender: "Bot", text: answer }])
      setWaiting(false)
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "Bot", text: "Sorry, I don't know the answer to that question. The following error occured: " + error }])
      setWaiting(false)
    }
  }
  

  return (
    <div className="h-screen flex justify-center items-center">
      <Card className="sm:min-w-[320px] sm:max-w-[80%] md:max-w-[50%]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Chatbot</CardTitle>
          <CardDescription>Ask me any question!</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-2 min-h-80">
          {messages.map((message, index) => message.sender === "You" ? (
            <div key={index} className="flex justify-end">
              <p className="bg-gray-100 py-2 px-4 rounded-md max-w-2/3">{message.text}</p>
            </div>
          ) : (
            <div key={index} className="flex justify-start">
              <p className="bg-gray-100 py-2 px-4 rounded-md max-w-2/3 break-words">{message.text}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between space-x-2">
          <Input disabled={waiting} value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Send question"
          onKeyDown={(e) => {
            if (e.key === 'Enter'){
              handleSend()
            }
          }}/>
          <Button disabled={waiting} className="cursor-pointer" onClick={handleSend}>Send</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default App
