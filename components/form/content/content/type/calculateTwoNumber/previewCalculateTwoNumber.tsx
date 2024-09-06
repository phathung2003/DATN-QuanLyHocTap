'use client';
import Image from 'next/image';
import '@/css/dropin_out.css';
import { useState, useEffect, useRef } from 'react';
import { ICalculateTwoNumbersContent } from '@/backend/models/data/Content/ICalculateTwoNumbers';
import { IContentList } from '@/backend/models/data/Content/IContent';
import {
  PlayAnswerSoundEffect,
  PlayOpeningSoundEffect,
  PlayEndingSoundEffect,
  Sleep,
  FormatTime,
} from '@/backend/feature/content/contentType/calculate_Two_Number';

//Image
const correctAnswerImage = '/images/calculateTwoNumber/correctAnwser.png';
const wrongAnswerImage = '/images/calculateTwoNumber/wrongAnwser.png';

interface IContentData {
  content: IContentList;
}

const PreviewCalculateTwoNumber: React.FC<IContentData> = ({ content }) => {
  const audioRef = useRef<HTMLAudioElement>(null); // Ref cho nhạc nền
  const [answer, setAnswer] = useState('');
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [questionNo, setquestionNo] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const [notification, setNotification] = useState<JSX.Element>(<div></div>);
  const [result, setResult] = useState(0); //0: Không có kết quả - 1: Đúng - 2: Sai
  const [gameState, setGameState] = useState<'start' | 'playing' | 'end'>(
    'start',
  );
  const [question, setQuestion] = useState<ICalculateTwoNumbersContent>();

  //Quản lý nhạc nền
  useEffect(() => {
    if (gameState === 'playing') {
      if (audioRef.current) {
        audioRef.current.play(); // Phát nhạc nền khi bắt đầu trò chơi
        // audioRef.current.currentTime = 10;
        audioRef.current.loop = true; // Lặp lại nhạc nền liên tục
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause(); // Dừng nhạc nền khi kết thúc trò chơi
        audioRef.current.currentTime = 0; // Quay về đầu nhạc
      }
    }
  }, [gameState]);

  //Đếm giờ
  useEffect(() => {
    if (gameState == 'playing') {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [gameState]);

  if (content.contentData?.length == 0) {
    return (
      <p className="flex h-80 w-full items-center justify-center text-lg font-bold">
        Chưa có nội dung
      </p>
    );
  }

  const calculationList = content.contentData as ICalculateTwoNumbersContent[];

  //Ghi nhận câu trả lời
  async function handleSubmit() {
    const userAnswer = parseInt(answer);
    if (!isNaN(userAnswer) && result == 0) {
      const isCorrect = userAnswer === question?.result;

      if (isCorrect) {
        setResult(1);
        setCorrectCount(correctCount + 1);
        setNotification(CorrectNotification());
        setScore(
          Math.round(((correctCount + 1) / calculationList.length) * 100),
        );
      } else {
        setResult(2);
        setIncorrectCount(incorrectCount + 1);
        setNotification(WrongNotification());
      }
      PlayAnswerSoundEffect(isCorrect);

      await Sleep(2500);
      setAnswer('');
      setResult(0);
      setNotification(<div />);
      setquestionNo(questionNo + 1);

      if (questionNo + 1 >= calculationList.length) {
        setGameState('end');
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        PlayEndingSoundEffect(score >= 70);
      } else {
        setQuestion(calculationList[questionNo + 1]);
      }
    }
  }

  //Bắt đầu
  function handleStartGame() {
    PlayOpeningSoundEffect();
    setCorrectCount(0);
    setIncorrectCount(0);
    setquestionNo(0);
    setScore(0);
    setQuestion(calculationList[0]);
    setAnswer('');
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setTime(0);
    setGameState('playing');
  }

  //Màn hình bắt đầu
  if (gameState === 'start') {
    return (
      <div className="flex h-80 items-center justify-center rounded-lg">
        {StartMenu(calculationList.length, handleStartGame)}
      </div>
    );
  }

  //Màn hình chơi
  if (gameState === 'playing') {
    return (
      <div className="flex h-80 items-center justify-center rounded-xl">
        <div className="relative h-full w-full">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col">
              <div className="text-lg font-bold">
                Thời gian:
                <span className="font-normal">{` ${FormatTime(time)}`}</span>
              </div>
              <div className="mt-4 text-lg font-bold">
                Câu hỏi:
                <span className="font-normal">
                  {` ${questionNo + 1} / ${calculationList.length}`}
                </span>
              </div>
            </div>
            <div id="score" className="text-xl font-bold">
              Điểm: <span className="font-normal">{score}</span>
            </div>
          </div>
          {notification}

          <div className="mt-10 flex h-30 flex-col items-center justify-center">
            <div className="max-w-[60%]">
              <div>
                <p id="question" className="mt-4 text-2xl font-semibold">
                  {`${question?.firstNumber} ${question?.operator} ${question?.secondNumber} = ?`}
                </p>
                <div>
                  <input
                    type="number"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleSubmit();
                      }
                    }}
                    readOnly={result != 0}
                    placeholder="Nhập câu trả lời"
                    className="border-gray-300 mb-2 mt-4 w-full rounded border p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div className="h-[60px]">
                {result == 2 && (
                  <p className="h-[48px] pt-3 font-bold text-rose-500">
                    {`Đáp án đúng: ${question?.result}`}
                  </p>
                )}
                {result == 0 && (
                  <button
                    onClick={handleSubmit}
                    className="mt-4 w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600"
                  >
                    Gửi
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Nhạc nền */}
        <audio ref={audioRef} src="/audio/clockTick.ogg" />
      </div>
    );
  }

  //Màn hình kết thúc
  if (gameState === 'end') {
    return (
      <div className="flex h-80 w-full items-center justify-center">
        {EndScreen(time, score, correctCount, incorrectCount, handleStartGame)}
      </div>
    );
  }
};

export default PreviewCalculateTwoNumber;

function StartMenu(totalQuestion, handleStartGame) {
  return (
    <div className="text-center">
      <h1 className="mb-4 text-2xl font-bold">
        Chào mừng tới trò chơi tính toán
      </h1>
      <p>Tổng số câu hỏi: {totalQuestion} câu</p>
      <p className="mt-7">Nhấn nút dưới đây để bắt đầu trò chơi.</p>
      <button
        id="start_Button"
        type="button"
        className="hover:bg-blue-60 mt-2 rounded bg-blue-500 p-3 text-white"
        onClick={handleStartGame}
      >
        Bắt đầu
      </button>
    </div>
  );
}

function EndScreen(time, score, correctCount, incorrectCount, handleStartGame) {
  return (
    <div className="text-center">
      <h2 className="mb-4 text-4xl font-bold text-rose-700 dark:text-rose-500">
        Kết quả
      </h2>
      <p className="mb-4 text-lg font-semibold ">
        Thời gian làm bài: {FormatTime(time)}
      </p>
      <p className="mb-4 text-2xl font-bold text-orange-600 dark:text-orange-500">
        {`Điểm: ${score}`}
      </p>
      <div className="mb-4 flex justify-center space-x-8 ">
        <p className="font-semibold text-green-600 dark:text-green-400">
          Số câu đúng: {correctCount}
        </p>
        <p className="font-semibold text-red dark:text-rose-400">
          Số câu sai: {incorrectCount}
        </p>
      </div>

      <div className="flex justify-center space-x-10">
        <button
          onClick={handleStartGame}
          className="rounded-full bg-green-500 p-4 text-white transition-all hover:bg-green-600"
        >
          Chơi Lại
        </button>
      </div>
    </div>
  );
}

function CorrectNotification() {
  return (
    <div>
      <div className="animate-dropDownAndUp absolute left-[40%] top-5 flex h-10 w-30 -translate-x-1/2 transform items-center justify-center rounded-lg bg-green-400 p-5 font-bold dark:bg-green-700">
        <p>Chính xác</p>
      </div>

      <div className="absolute bottom-0 left-0">
        <Image
          src={correctAnswerImage}
          alt="Correct Answer"
          priority
          width={100}
          height={100}
          quality={75}
        />
      </div>
    </div>
  );
}

function WrongNotification() {
  return (
    <div>
      <div className="animate-dropDownAndUp absolute left-[40%] top-5 flex h-10 w-30 -translate-x-1/2 transform items-center justify-center rounded-lg bg-red p-5 font-bold text-white dark:bg-rose-700">
        <p>Sai rồi</p>
      </div>

      <div className="absolute bottom-0 left-0">
        <Image
          src={wrongAnswerImage}
          alt="Correct Answer"
          priority
          width={100}
          height={100}
          quality={75}
        />
      </div>
    </div>
  );
}
