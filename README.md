# 🚀 NexoAI - AI Career Development Platform

AI-powered career development platform helping professionals build resumes, prepare for interviews, and advance their careers with intelligent insights and real-time market data.

![NexoAI Banner](public/banner.jpeg)

## ✨ Features

- **🤖 AI Resume Builder** - Create ATS-optimized resumes with real-time feedback and scoring
- **📝 Smart Cover Letter Generator** - Generate personalized cover letters using AI analysis
- **🎯 Interactive Interview Prep** - Quiz system with AI-powered improvement tips
- **📊 Industry Insights Dashboard** - Real-time market trends, salary data, and career guidance
- **👤 Personalized Experience** - User profiles with industry-specific recommendations
- **📈 Progress Tracking** - Monitor your career development journey

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with optimized collections
- **Authentication**: Clerk (secure user management)
- **AI Integration**: Google Gemini AI
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Background Jobs**: Inngest
- **Styling**: Custom dark theme with blue accents

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
│   ├── (auth)/            # Authentication pages
│   ├── (main)/            # Main application pages
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/             # Reusable UI components
├── lib/                    # Database and utility functions
│   ├── db.js              # MongoDB operations
│   ├── mongodb.js         # MongoDB connection
│   └── setup-db.js        # Database initialization
├── actions/                # Server actions
└── data/                   # Static data files
```

## 🎯 Key Features Explained

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
