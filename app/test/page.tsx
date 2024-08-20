'use client';
import { useState, useEffect, useRef } from 'react';

interface Question {
  question: string;
  answer: number;
}

interface AnswerHistory {
  question: string;
  userAnswer: number;
  correctAnswer: number;
  isCorrect: boolean;
}

export default function MathGame() {
  const totalQuestions = 10; // Giới hạn số câu
  const initialTime = 60; // Thời gian giới hạn (giây)

  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>(
    'start',
  ); // 'start', 'playing', 'end'
  const [question, setQuestion] = useState<Question>(generateQuestion());
  const [answer, setAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [currentQuestionCount, setCurrentQuestionCount] = useState(0);
  const [result, setResult] = useState('');
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [answersHistory, setAnswersHistory] = useState<AnswerHistory[]>([]); // Lưu lịch sử câu trả lời

  const audioRef = useRef<HTMLAudioElement>(null); // Ref cho nhạc nền

  function generateQuestion(): Question {
    // Generate a simple question
    return { question: '5 + 3', answer: 8 }; // Example question
  }

  function playSound(isCorrect: boolean) {
    const audio = new Audio(
      `/audio/${isCorrect ? 'correct' : 'incorrect'}.mp3`,
    );
    audio.play();
  }

  function handleSubmit() {
    const userAnswer = parseInt(answer);
    const isCorrect = userAnswer === question.answer;

    if (isCorrect) {
      setResult('Đúng rồi!');
      setCorrectCount(correctCount + 1);
    } else {
      setResult('Sai rồi, thử lại!');
      setIncorrectCount(incorrectCount + 1);
    }

    playSound(isCorrect);

    // Lưu lịch sử câu trả lời
    setAnswersHistory((prev) => [
      ...prev,
      {
        question: question.question,
        userAnswer,
        correctAnswer: question.answer,
        isCorrect,
      },
    ]);

    setAnswer('');
    setCurrentQuestionCount(currentQuestionCount + 1);

    if (currentQuestionCount + 1 >= totalQuestions) {
      setGameState('end');
    } else {
      setQuestion(generateQuestion());
    }
  }

  function handleStartGame() {
    setGameState('playing');
    setTimeLeft(initialTime);
  }

  function handleEndGame() {
    setGameState('end');
  }

  function handleRestart() {
    setGameState('playing');
    setCorrectCount(0);
    setIncorrectCount(0);
    setAnswer('');
    setCurrentQuestionCount(0);
    setQuestion(generateQuestion());
    setTimeLeft(initialTime);
    setAnswersHistory([]); // Xóa lịch sử câu trả lời khi bắt đầu trò chơi mới
  }

  useEffect(() => {
    if (gameState === 'playing') {
      if (audioRef.current) {
        audioRef.current.play(); // Phát nhạc nền khi bắt đầu trò chơi
        audioRef.current.currentTime = 10;
        audioRef.current.loop = true; // Lặp lại nhạc nền liên tục
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause(); // Dừng nhạc nền khi kết thúc trò chơi
        audioRef.current.currentTime = 0; // Quay về đầu nhạc
      }
    }
  }, [gameState]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameState('end');
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [gameState, timeLeft]);

  const progress = (timeLeft / initialTime) * 100;

  if (gameState === 'start') {
    return (
      <div className="mx-auto mt-8 w-80 rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">
          Chào Mừng Đến Với Game Tính Toán!
        </h1>
        <p className="mb-4">Nhấn nút dưới đây để bắt đầu trò chơi.</p>
        <button
          onClick={handleStartGame}
          className="rounded bg-blue-500 p-3 text-white hover:bg-blue-600"
        >
          Bắt đầu
        </button>
      </div>
    );
  }

  if (gameState === 'end') {
    return (
      <div className="mx-auto mt-8 w-80 rounded-lg bg-white p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-bold">Kết Thúc!</h1>
        <p className="mb-4">Số câu đúng: {correctCount}</p>
        <p className="mb-4">Số câu sai: {incorrectCount}</p>
        <button
          onClick={handleRestart}
          className="rounded bg-blue-500 p-3 text-white hover:bg-blue-600"
        >
          Chơi Lại
        </button>
        <div className="mt-8">
          <h2 className="mb-4 text-xl font-bold">Lịch Sử Câu Trả Lời</h2>
          <ul>
            {answersHistory.map((item, index) => (
              <li key={index} className="mb-2">
                <p>
                  <strong>Câu hỏi:</strong> {item.question}
                </p>
                <p>
                  <strong>Câu trả lời của bạn:</strong> {item.userAnswer}
                </p>
                <p>
                  <strong>Đáp án đúng:</strong> {item.correctAnswer}
                </p>
                <p>
                  <strong>Đúng:</strong> {item.isCorrect ? 'Có' : 'Không'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 w-80 rounded-lg bg-white p-8 shadow-lg">
      <h1 className="mb-4 text-2xl font-bold">Game Tính Toán</h1>
      <div className="mb-4">
        <p className="text-lg font-medium">Câu hỏi:</p>
        <p id="question" className="text-xl font-semibold">
          {question.question} = ?
        </p>
      </div>
      <div className="mb-4">
        <input
          type="number"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Nhập câu trả lời"
          className="border-gray-300 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <button
          onClick={handleSubmit}
          className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600"
        >
          Gửi
        </button>
      </div>
      <div id="result" className="mb-4 text-lg font-medium">
        {result}
      </div>
      <div className="mb-4 text-lg font-medium">
        <p>
          Số câu đúng: <span id="correctCount">{correctCount}</span>
        </p>
        <p>
          Số câu sai: <span id="incorrectCount">{incorrectCount}</span>
        </p>
        <p>Câu hỏi còn lại: {totalQuestions - currentQuestionCount}</p>
        <p>Thời gian còn lại: {timeLeft} giây</p>
      </div>
      <div className="bg-gray-200 mb-4 h-2.5 w-full rounded-full">
        <div
          className="h-2.5 rounded-full bg-blue-500"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <button
        onClick={handleEndGame}
        className="bg-red-500 hover:bg-red-600 mt-4 w-full rounded p-3 text-white"
      >
        Kết Thúc
      </button>
      {/* Nhạc nền */}
      <audio ref={audioRef} src="/audio/background-music.mp3" />
    </div>
  );
}
