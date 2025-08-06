# 🚀 NexoAI - AI Career Development Platform

AI-powered career development platform helping professionals build resumes, prepare for interviews, practice coding tests, and advance their careers with intelligent insights and real-time market data.

![NexoAI Banner](public/banner.jpeg)

## ✨ Features

- **🤖 AI Resume Builder** - Create ATS-optimized resumes with real-time feedback and scoring
- **📝 Smart Cover Letter Generator** - Generate personalized cover letters using AI analysis
- **💻 AI Coding Test Platform** - Practice coding problems in a LeetCode-like environment with AI-powered evaluation
- **🎯 Interactive Interview Prep** - Quiz system with AI-powered improvement tips
- **📊 Industry Insights Dashboard** - Real-time market trends, salary data, and career guidance
- **👤 Personalized Experience** - User profiles with industry-specific recommendations
- **📈 Progress Tracking** - Monitor your career development journey

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Authentication**: Clerk
- **AI Integration**: Google Gemini AI
- **UI Components**: Shadcn UI, Radix UI
- **Animations**: Framer Motion
- **Background Jobs**: Inngest

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB instance
- Clerk account for authentication
- Google Gemini AI API key

### Installation
1. **Clone the repository**
   ```bash
   git clone https://github.com/theshibaprasad/NexoAI.git
   cd NexoAI
   ```
2. **Install dependencies**
   ```bash
   npm install
   ```
3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   Add your environment variables:
   ```env
   # MongoDB
   MONGODB_URI=your_mongodb_connection_string
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   # Google Gemini AI
   GEMINI_API_KEY=your_gemini_api_key
   ```
4. **Set up the database**
   ```bash
   node lib/setup-db.js
   ```
5. **Run the development server**
   ```bash
   npm run dev
   ```
6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```text
├── app/                    # Next.js app directory
│   ├── (auth)/             # Authentication pages
│   ├── (main)/             # Main application pages
│   │   └── coding-test/    # Coding test feature
│   ├── api/                # API routes
│   └── globals.css         # Global styles
├── components/             # Reusable UI components
├── lib/                    # Database and utility functions
│   ├── db.js               # MongoDB operations
│   ├── mongodb.js          # MongoDB connection
│   └── setup-db.js         # Database initialization
├── actions/                # Server actions
├── data/                   # Static data files
```

## 💻 AI Coding Test Platform

### Overview
The AI Coding Test feature provides a professional coding environment similar to LeetCode, where users can practice coding problems with AI-powered evaluation and real-time feedback.

### Key Features
- **Professional Code Editor**: Monaco Editor with syntax highlighting for 10+ languages
- **AI-Powered Evaluation**: Uses Gemini AI to execute and test code
- **Multiple Languages**: JavaScript, Python, Java, C++, C#, Go, Rust, PHP, Ruby, Swift
- **Problem Generation**: AI generates new coding problems by difficulty and topic
- **Predefined Problems**: Curated collection of coding problems
- **Real-time Testing**: Instant feedback on code execution and test cases
- **Performance Metrics**: Execution time and memory usage
- **Detailed Feedback**: Input, expected output, and actual output for each test case
- **Responsive UI**: Split layout, real-time results, and mobile support

### Usage
1. **Access the Feature**: Go to `/coding-test` or use the "Coding Test" option in the Growth Tools dropdown
2. **Select a Problem**: Choose from predefined problems or generate a new one
3. **Write Code**: Use the code editor to write your solution
4. **Run Tests**: Click "Run Code" to execute and test your solution
5. **Review Results**: View detailed feedback and performance metrics

### API Endpoints
- **POST `/api/coding-test/run`**: Execute and test user code
  - Request: `{ code, language, problem }`
  - Response: `{ success, error, executionTime, memoryUsage, passedTests, totalTests, testCases }`
- **POST `/api/coding-test/generate`**: Generate new coding problems
  - Request: `{ difficulty, topic, language }`
  - Response: `{ title, difficulty, description, examples, constraints, testCases, functionSignature }`

### File Structure
```
app/(main)/coding-test/
├── page.jsx                    # Main coding test page
├── layout.jsx                  # Layout for coding test section
└── _components/
    ├── code-editor.jsx         # Monaco Editor component
    ├── problem-statement.jsx   # Problem display component
    ├── test-cases.jsx          # Test results display
    ├── problem-generator.jsx   # AI problem generation
    └── problem-selector.jsx    # Problem selection interface

data/
└── coding-problems.js          # Predefined problems database

app/api/coding-test/
├── run/route.js                # Code execution API
└── generate/route.js           # Problem generation API
```

### Technologies Used
- **Monaco Editor**: Professional code editor
- **Gemini AI**: AI-powered code execution and evaluation
- **Next.js**: React framework
- **Tailwind CSS**: Styling
- **Radix UI**: Accessible UI components

### Future Enhancements
- User progress tracking
- Leaderboards
- Code sharing
- Custom test cases
- Code templates
- Performance analytics

## 🎯 Other Key Features

### AI Resume Builder
- Intelligent content suggestions
- ATS optimization scoring
- Professional templates
- Real-time feedback

### Smart Cover Letter Generator
- Job description analysis
- Personalized content creation
- Multiple format options
- AI-driven improvements

### Interview Preparation
- Interactive quiz system
- Performance analytics
- Category-based learning
- AI improvement tips

### Industry Insights
- Real-time market data
- Salary range analysis
- Growth rate indicators
- Skill recommendations

## 🔧 Database Schema

### Collections
- **Users**: Profile management and preferences
- **Assessments**: Quiz results and performance data
- **Resumes**: ATS-optimized resume content
- **Cover Letters**: AI-generated cover letters
- **Industry Insights**: Market data and trends

## 🎨 UI/UX Features
- **Dark Theme**: Professional dark interface with blue accents
- **Responsive Design**: Optimized for all devices
- **Smooth Animations**: Engaging user interactions
- **Intuitive Navigation**: Easy-to-use interface
- **Real-time Updates**: Live data and insights

## 🔒 Security & Performance
- **Secure Authentication**: Clerk-powered user management
- **Data Privacy**: MongoDB with proper indexing
- **Performance Optimized**: Next.js with efficient rendering
- **Scalable Architecture**: Modern microservices approach

## 🤝 Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments
- [Next.js](https://nextjs.org/) for the amazing framework
- [Clerk](https://clerk.com/) for authentication
- [Google Gemini AI](https://ai.google.dev/) for AI capabilities
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Shadcn UI](https://ui.shadcn.com/) for components

## 📞 Contact
**Shiba Prasad Swain** - [LinkedIn](https://www.linkedin.com/in/theshibaprasad/) - theshibaprasad@gmail.com

---

⭐ If you found this project helpful, please give it a star!
