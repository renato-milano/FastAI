import { useState, React } from "react";
import { message } from "../lib/AI.js";
const ChatInput = ({ messageSended }) => {
  const [Message, setMessage] = useState("");
  const handleClick = () => {
    setMessage("");
    messageSended(Message);
  };
  const handleMessage = (e) => {
    if (e.key === "Enter") {
      console.log("INVIO");
      messageSended(Message);
      setMessage("");
    }
  };
  return (
    <>
      <div className="w-full md:w-[50%] m-auto h-[10vh] bg-black-100">
        <div>
          <label
            for="search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Scrivi...
          </label>
          <div className="relative">
            <input
              value={Message}
              onKeyDown={handleMessage}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              type="search"
              autocomplete="off"
              id="message"
              className="autofill:bg-transparent focus:ring-0 focus:outline-none block w-full p-4  text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Scrivi.."
              required
            />
            <button
              onClick={handleClick}
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Invia
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatInput;
