import React, { useEffect, useState } from 'react'
import useQBStore from '../hooks/useQBStore'

function QuizPage() {
    const QBStore = useQBStore();
    const QuestionBank = QBStore.QB;

    const[current, setCurrent] = useState(0);
    const[score, setScore] = useState(0);
    const[showScore, setShowScore] = useState(false);

    const handleSubmit = () => {
      if (option === QuestionBank[current].correctAnswer) {
        setScore(score => score + 1);
      }
      setShowScore(true);
    };

    const handleNext = () => {
      const next = current + 1;
      if (next < QuestionBank.length) {
        setCurrent(next);
      } else {
        handleSubmit();
      }
    }

    const handlePrevious = () => {
      const previous = current - 1;
      if (previous >= 0) {
        setCurrent(previous);
      }
    }

    useEffect(() => {
      if (showScore) 
        return (
          <>
          <h2>Quiz Completed</h2>
          <h3>{score} / {QuestionBank.length}</h3>
          </>
      );
    }, [showScore]);

  return (
    <>
      <h1>{current + 1}. {QuestionBank[current].question}</h1>

      {QuestionBank[current].options.map((option, i) => {
        return(
        <>
        <input
         type="radio"
         name="answer"
         id={i} 
         key={i}/> <label style={{display: 'inline'}} htmlFor={i}>{option}</label> <br /><br />
         </>
         )
      })}

      <button onClick={handlePrevious}>Previous</button>
      <button onClick={handleNext}>Next</button>
    </>
  )
}

export default QuizPage