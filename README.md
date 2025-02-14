# AI Chatbot with Groq - React App Skeleton

This repository contains a skeleton for a React-based (using Vite) AI chatbot application using Groq. It provides a minimal yet extensible structure to build a chatbot UI and integrate it with Groq's API for AI-powered conversations.

## Personal Customization Example
<div align="center">
  <img src="https://i.ibb.co/LdxdwJtG/AI-HOME.png" alt="Chatbot Preview 1" width="400"/>
  <img src="https://i.ibb.co/5WCPn5Zz/Chat-AI.png" alt="Chatbot Preview 2" width="400"/>
</div>

## Features
- React-based UI
- API integration with Groq
- Modular structure for easy extension
- Basic state management
- Responsive design

## Prerequisites
Before you begin, ensure you have the following:
- [Node.js](https://nodejs.org/) (Latest LTS recommended)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Groq API key

## Installation
Clone the repository and install dependencies:
```sh
git clone https://github.com/renato-milano/ReactTemplateAI.git
cd ReactTemplateAI
npm install  # or yarn install
```

## Configuration
Basically you have two options
#### Option. 1
Create a `.env` file in the root directory and add your Groq API key:
```
REACT_APP_GROQ_API_KEY=your-api-key-here
```
#### Option. 2 (not raccomanded)
Hardcode your Groq API key in `.lib/AI.js`:
```
const client = new Groq({ apiKey: 'INSERT-YOUR-API-KEY', dangerouslyAllowBrowser: true });
```

## Customization
Make sure to edit those simple parameters in `.src/pages/Chat.jsx` to give your AI a first basic customization
```
  const SystemPrompt = "YOUR SISTEM PROMPT HERE";
  const AvatarAI ="THE PATH OR URL OF THE AVATAR YOU WANT TO USE FOR YOUR AI";
  const AssistantName = "THE NAME OF YOUR AI ASSISTANT";
```


## Running the App
Start the development server:
```sh
npm run dev  # or yarn start
```
This will launch the app on `http://localhost:5173/`.

## Project Structure
```
.
├── src
│   ├── components   # Reusable UI components
│   ├── lib          # API call handlers
│   ├── pages        # Main application pages
│   ├── App.jsx      # Root component
|   ├── App.css      # CSS document for root
|   ├── index.css    # CSS document for entry point
│   └── main.jsx     # Entry point
├── public           # Static assets
├── package.json     # Project dependencies
└── README.md        # Project documentation
```

## Deployment
To build the app for production:
```sh
npm run build  # or yarn build
```
Deploy the `build/` folder to your preferred hosting provider (e.g., Vercel, Netlify, or Firebase Hosting).

## Contributing
Feel free to fork this repository, submit issues, or contribute improvements via pull requests.

## License
This project is licensed under the [MIT License](LICENSE).

## Contact
For any inquiries or suggestions, open an issue or reach out via GitHub.

---
Enjoy building your AI chatbot! 🚀

