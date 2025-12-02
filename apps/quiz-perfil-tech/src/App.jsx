import { useState } from 'react';
import Hero from './components/Hero';
import Why from './components/Why';
import HowItWorks from './components/HowItWorks';
import ProfileCards from './components/ProfileCards';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Quiz from './components/Quiz';
import quizData from './config.json';

function App() {
  const [showQuiz, setShowQuiz] = useState(false);

  if (showQuiz) {
    return <Quiz onStart={() => setShowQuiz(false)} />;
  }

  return (
    <div className="font-poppins bg-gradient-to-br from-lavender-50 via-pink-50 to-blue-50 min-h-screen">
      <Hero onStartQuiz={() => setShowQuiz(true)} />
      <Why />
      <HowItWorks />
      <ProfileCards onStartQuiz={() => setShowQuiz(true)} />
      <Testimonials />
      <FinalCTA onStartQuiz={() => setShowQuiz(true)} />
    </div>
  );
}

export default App;
