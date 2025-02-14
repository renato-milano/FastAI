import { useState, useEffect, React, useRef } from "react";
import ChatInput from "../components/ChatInput.jsx";
import Conversation from "../components/Conversation.jsx";
import { message, getGroqChatStream } from "../lib/AI.js";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Sidebar from "../components/Sidebar.jsx";

export const Chat = () => {
  const SystemPrompt = "INSERT YOUR SISTEM PROMPT HERE";

  const AvatarAI =
    "INSERT HERE THE PATH OR URL OF THE AVATAR YOU WANT TO USE FOR YOUR AI";

  const [Message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [conversation, setConversation] = useState([
    { role: "system", content: SystemPrompt },
  ]);
  const [generating, setGenerating] = useState(false);
  const messagesEndRef = useRef(null); // Ref per lo scrolling

  const updateConvo = async (data) => {
    setConversation([...conversation, { role: "user", content: data }]);
    setGenerating(true);
    await handleMessage([...conversation, { role: "user", content: data }]);
    setGenerating(false);
  };

  const handleMessage = async (conversation) => {
    let stream = await getGroqChatStream(conversation);
    let piece = result;
    for await (const chunk of stream) {
      setResult((piece += chunk.choices[0]?.delta?.content || ""));
    }
    setResult("");
    setConversation([...conversation, { role: "assistant", content: piece }]);

    console.log(conversation);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, generating]);
  return (
    <div className="w-full h-screen p-10 overflow-x-hidden no-scrollbar">
      <div className="h-[90%] mb-4 bg-opacity-50 rounded-3xl flex flex-col justify-between items-center">
        <>
          {conversation.length == 1 ? (
            <>
              <div className="fade-in first flex flex-col items-center justify-center h-[75%]">
                <div className="text-gray-200 text-opacity-50 text-9xl font-montserrat mb-5">
                  Hey, AI!
                </div>
                <div className="text-gray-200 text-opacity-50 text-lg font-montserrat">
                  AI Assistant
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="overflow-y-auto absolute h-[75%] w-[90%] md:w-[75%] lg:w-[50%] no-scrollbar bg-opacity-50 text-justify">
                {conversation.map((msg, index) => (
                  <>
                    {msg.role != "system" ? (
                      <div
                        key={index}
                        className={`flex my-4 ${
                          msg.role === "user" ? "justify-end" : "justify-start"
                        } ${
                          msg.role === "user" ? "fade-in-fromRight first" : ""
                        }`}
                      >
                        <div
                          className={`${
                            msg.role === "user"
                              ? "flex"
                              : "flex flex-row-reverse"
                          }`}
                        >
                          <div
                            className={`p-2 max-w-xl rounded-lg text-white ${
                              msg.role === "user"
                                ? "bg-blue-500 bg-opacity-50"
                                : "bg-gray-800 bg-opacity-50"
                            }`}
                          >
                            <ReactMarkdown
                              components={{
                                ul: ({ node, ...props }) => (
                                  <ul
                                    className="list-disc pl-5 text-white"
                                    {...props}
                                  />
                                ),
                                p: ({ node, ...props }) => (
                                  <p className="my-2" {...props} />
                                ),
                                ol: ({ node, ...props }) => (
                                  <ol
                                    className="list-decimal pl-3 text-white text-sm pr-5 my-2"
                                    {...props}
                                  />
                                ),
                              }}
                              remarkPlugins={[remarkGfm]}
                            >
                              {msg.content}
                            </ReactMarkdown>
                          </div>
                          <div className="px-2">
                            {msg.role == "user" ? (
                              <>
                                <img
                                  src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
                                  alt="Avatar"
                                  class="w-8 h-8 rounded-full"
                                />
                              </>
                            ) : (
                              <>
                                <img
                                  src={AvatarAI}
                                  alt="Avatar"
                                  class="w-8 h-8 rounded-full"
                                />
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </>
                ))}
                {generating ? (
                  <div className={`${true ? "flex" : "flex flex-row-reverse"}`}>
                    <div
                      className={`flex my-2 fade-in-fromRight first ${
                        false ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`p-2 max-w-xl rounded-lg text-white ${
                          false ? "bg-blue-500" : "bg-gray-800 bg-opacity-50"
                        }`}
                      >
                        {result}
                      </div>
                    </div>
                    <img
                      src={AvatarAI}
                      alt="Avatar"
                      className="fade-in second w-8 h-8 rounded-full"
                    />
                  </div>
                ) : (
                  <></>
                )}
                <div ref={messagesEndRef}></div>
              </div>
            </>
          )}
        </>
      </div>
      <div className="fade-in second">
        <ChatInput messageSended={updateConvo} />
      </div>
    </div>
  );
};
