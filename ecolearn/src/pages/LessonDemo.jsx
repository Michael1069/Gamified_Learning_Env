// src/pages/LessonDemo.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const LessonDemo = () => {
  const navigate = useNavigate();
  const { lessonId } = useParams();
  const [progress, setProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(1);
  const [quizState, setQuizState] = useState({
    currentQuestion: 0,
    selectedAnswers: {},
    correctAnswers: 0,
    isCompleted: false,
    showResults: false
  });

  const sectionsRef = useRef([]);
  const totalSections = 8;

  // Quiz data
  const quizQuestions = [
    {
      id: 1,
      question: "What is the primary goal of tree plantation drives under the Green India Mission?",
      options: [
        { value: "Afforestation", label: "Afforestation and ecosystem restoration" },
        { value: "Deforestation", label: "Selective deforestation" },
        { value: "Urbanization", label: "Urban development" },
        { value: "Mining", label: "Mining expansion" }
      ],
      correct: "Afforestation"
    },
    {
      id: 2,
      question: "Which type of sustainability data includes greenhouse gas emissions and resource consumption?",
      options: [
        { value: "Social", label: "Social metrics" },
        { value: "Environmental", label: "Environmental metrics" },
        { value: "Economic", label: "Economic metrics" },
        { value: "Political", label: "Political metrics" }
      ],
      correct: "Environmental"
    },
    {
      id: 3,
      question: "How much temperature reduction was recorded in Bengaluru's tree-lined areas during peak summer?",
      options: [
        { value: "2°C temperature", label: "Up to 2°C temperature drop" },
        { value: "5°C temperature", label: "Up to 5°C temperature drop" },
        { value: "8°C temperature", label: "Up to 8°C temperature drop" },
        { value: "No change", label: "No temperature change" }
      ],
      correct: "5°C temperature"
    },
    {
      id: 4,
      question: "How much wave energy can mangroves reduce during cyclones and storms?",
      options: [
        { value: "30% wave energy", label: "Up to 30% wave energy reduction" },
        { value: "50% wave energy", label: "Up to 50% wave energy reduction" },
        { value: "70% wave energy", label: "Up to 70% wave energy reduction" },
        { value: "90% wave energy", label: "Up to 90% wave energy reduction" }
      ],
      correct: "70% wave energy"
    },
    {
      id: 5,
      question: "What percentage of India's geographical area is currently covered by forests and trees?",
      options: [
        { value: "20.15%", label: "20.15% forest and tree cover" },
        { value: "25.17%", label: "25.17% forest and tree cover" },
        { value: "30.25%", label: "30.25% forest and tree cover" },
        { value: "35.40%", label: "35.40% forest and tree cover" }
      ],
      correct: "25.17%"
    }
  ];

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      setProgress(Math.min(scrollPercent, 100));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionIndex = sectionsRef.current.findIndex(ref => ref === entry.target);
            if (sectionIndex !== -1) {
              setCurrentSection(sectionIndex + 1);
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Quiz handlers
  const handleAnswerSelect = (questionId, answer) => {
    setQuizState(prev => ({
      ...prev,
      selectedAnswers: {
        ...prev.selectedAnswers,
        [questionId]: answer
      }
    }));
  };

  const handleQuizSubmit = () => {
    const currentQ = quizQuestions[quizState.currentQuestion];
    const selectedAnswer = quizState.selectedAnswers[currentQ.id];
    
    if (!selectedAnswer) {
      alert('Please select an answer!');
      return;
    }

    const isCorrect = selectedAnswer === currentQ.correct;
    const newCorrectAnswers = quizState.correctAnswers + (isCorrect ? 1 : 0);

    if (quizState.currentQuestion < quizQuestions.length - 1) {
      // Next question
      setQuizState(prev => ({
        ...prev,
        currentQuestion: prev.currentQuestion + 1,
        correctAnswers: newCorrectAnswers
      }));
    } else {
      // Quiz completed
      setQuizState(prev => ({
        ...prev,
        correctAnswers: newCorrectAnswers,
        isCompleted: true,
        showResults: true
      }));

      if (newCorrectAnswers === quizQuestions.length) {
        setTimeout(() => {
          const completionElement = document.getElementById('completion');
          if (completionElement) {
            completionElement.scrollIntoView({ behavior: 'smooth' });
          }
        }, 2000);
      }
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      selectedAnswers: {},
      correctAnswers: 0,
      isCompleted: false,
      showResults: false
    });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Complete lesson and return to lessons page
  const completeLessonAndReturn = () => {
    // Navigate back with completion parameter
    navigate(`/dashboard/lessons?completed=${lessonId}`);
  };

  // Return to lessons without completion
  const returnToLessons = () => {
    navigate('/dashboard/lessons');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-200 via-orange-200 to-yellow-100">
      {/* Header with back button */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-white/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={returnToLessons}
              className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Lessons
            </button>
            <h1 className="text-2xl font-bold text-gray-800">Sustainability Data Lesson</h1>
            <div className="text-sm text-gray-600">
              Lesson {lessonId}
            </div>
          </div>
        </div>
      </nav>

      {/* Progress bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-green-500 to-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Main content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        
        {/* Introduction Section */}
        <section 
          ref={(el) => { sectionsRef.current[0] = el; }} 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              🌱 Green India Mission: Data-Driven Sustainability
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Discover how data insights are transforming India's environmental landscape through strategic tree plantation and sustainable practices.
            </p>
          </div>
        </section>

        {/* Data Strategy Section */}
        <section 
          ref={(el) => { sectionsRef.current[1] = el; }} 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <div className="text-6xl mb-6">📊</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Data-Driven Strategies</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Data-driven strategies enable organizations to make evidence-based sustainability choices by leveraging comprehensive analytics and measurable outcomes.
            </p>
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <p className="text-green-800 font-medium">
                💡 Organizations using data-driven sustainability strategies are 3x more likely to achieve their environmental goals.
              </p>
            </div>
          </div>
        </section>

        {/* Metrics Section */}
        <section 
          ref={(el) => { sectionsRef.current[2] = el; }} 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <div className="text-6xl mb-6">📈</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Quantifiable Metrics</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Quantifiable metrics help monitor advancement toward sustainability goals and targets, providing clear benchmarks for environmental impact.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-2">Carbon Footprint</h3>
                <p className="text-blue-600">Monitor CO2 emissions and reduction targets</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-800 mb-2">Forest Coverage</h3>
                <p className="text-purple-600">Track afforestation progress and biodiversity</p>
              </div>
            </div>
          </div>
        </section>

        {/* Risk Analysis Section */}
        <section 
          ref={(el) => { sectionsRef.current[3] = el; }} 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <div className="text-6xl mb-6">⚠</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Risk Analysis</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Early identification of environmental and social risks through comprehensive data analysis enables proactive mitigation strategies.
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <p className="text-amber-800 font-medium">
                🔍 Predictive analytics can identify climate risks up to 2 years in advance, enabling better preparedness.
              </p>
            </div>
          </div>
        </section>

        {/* Innovation Section */}
        <section 
          ref={(el) => { sectionsRef.current[4] = el; }} 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center">
            <div className="text-6xl mb-6">💡</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Innovation Driver</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              Data insights drive development of sustainable technologies and business models, fostering innovation in environmental solutions.
            </p>
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
              <p className="text-indigo-800 font-medium">
                🚀 Dr. RK Nair's revolutionary Miyawaki technique transforms barren lands into thriving forests in record time.
              </p>
            </div>
          </div>
        </section>

        {/* Quiz Section */}
        <section 
          ref={(el) => { sectionsRef.current[5] = el; }} 
          className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">🧠</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Knowledge Check</h2>
            <p className="text-lg text-gray-600">
              Test your understanding of tree plantation and sustainability data! Answer all 5 questions correctly to complete the course.
            </p>
          </div>

          {!quizState.showResults ? (
            <div className="text-left">
              <div className="mb-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-gray-500">
                    Question {quizState.currentQuestion + 1} of {quizQuestions.length}
                  </span>
                  <div className="flex space-x-1">
                    {quizQuestions.map((_, index) => (
                      <div
                        key={index}
                        className={`w-3 h-3 rounded-full ${
                          index <= quizState.currentQuestion ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-gray-800 mb-6">
                  {quizQuestions[quizState.currentQuestion].question}
                </h3>
                
                <div className="space-y-3">
                  {quizQuestions[quizState.currentQuestion].options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(quizQuestions[quizState.currentQuestion].id, option.value)}
                      className={`w-full p-4 text-left border rounded-xl transition-all ${
                        quizState.selectedAnswers[quizQuestions[quizState.currentQuestion].id] === option.value
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <button
                onClick={handleQuizSubmit}
                className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-medium transition-colors"
              >
                {quizState.currentQuestion === quizQuestions.length - 1 ? 'Submit Quiz' : 'Next Question'}
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">
                {quizState.correctAnswers === quizQuestions.length ? '🎉' : '📚'}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Results</h3>
              <p className="text-xl text-gray-600 mb-6">
                You scored {quizState.correctAnswers} out of {quizQuestions.length} questions correctly!
              </p>
              
              {quizState.correctAnswers === quizQuestions.length ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <p className="text-green-800 font-bold text-lg">
                    🎉 Perfect score! You've mastered the content!
                  </p>
                </div>
              ) : (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-6">
                  <p className="text-amber-800 font-medium mb-4">
                    Review the material and try again to achieve a perfect score.
                  </p>
                  <button
                    onClick={resetQuiz}
                    className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-medium transition-colors"
                  >
                    Retry Quiz
                  </button>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Completion Section */}
        {quizState.correctAnswers === quizQuestions.length && (
          <section 
            id="completion" 
            ref={(el) => { sectionsRef.current[6] = el; }} 
            className="bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="text-center">
              <div className="text-6xl mb-6 animate-bounce">🌟</div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations!</h2>
              <p className="text-xl text-gray-600 mb-6">
                You've successfully completed the Green India Mission journey and learned about sustainability data!
              </p>
              
              <div className="bg-white/80 rounded-xl p-6 mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">You're now ready to become a</h3>
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
                  Green Champion
                </div>
                <p className="text-lg text-gray-600 mb-4">and sustainability data expert!</p>
                <p className="text-gray-500">
                  Share this knowledge and inspire others to join India's reforestation mission.
                </p>
              </div>

              <button
                onClick={completeLessonAndReturn}
                className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white rounded-xl font-bold text-xl transition-all duration-300 transform hover:scale-105 animate-pulse"
              >
                Complete Lesson & Earn Eco Points! 🌟
              </button>
            </div>
          </section>
        )}

        {/* Back to Top Button */}
        <div className="text-center">
          <button
            onClick={scrollToTop}
            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default LessonDemo;
