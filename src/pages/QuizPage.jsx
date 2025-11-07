import React, { useState } from 'react'
import useQBStore from '../hooks/useQBStore'

function QuizPage() {
    const QBStore = useQBStore();
    const QuestionBank = QBStore.QB;
    const { setAttemptHistory, attemptHistory, clearHistory } = QBStore;

    const [current, setCurrent] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [selectedAnswers, setSelectedAnswers] = useState({});
    const [showHistory, setShowHistory] = useState(false);

    const handleAnswerSelect = (questionIndex, answerIndex) => {
        setSelectedAnswers(prev => ({
            ...prev,
            [questionIndex]: answerIndex
        }));
    };

    const calculateScore = () => {
        let correct = 0;
        QuestionBank.forEach((question, index) => {
            if (selectedAnswers[index] === question.correctAnswer) {
                correct++;
            }
        });
        return correct;
    };

    const handleSubmit = () => {
        const finalScore = calculateScore();
        setScore(finalScore);
        setShowScore(true);

        // Save attempt to history
        const attempt = {
            date: new Date().toLocaleString(),
            score: finalScore,
            total: QuestionBank.length,
            answers: selectedAnswers
        };
        setAttemptHistory(attempt);
    };

    const handleNext = () => {
        const next = current + 1;
        if (next < QuestionBank.length) {
            setCurrent(next);
        } else {
            handleSubmit();
        }
    };

    const handlePrevious = () => {
        const previous = current - 1;
        if (previous >= 0) {
            setCurrent(previous);
        }
    };

    const restartQuiz = () => {
        setCurrent(0);
        setScore(0);
        setShowScore(false);
        setSelectedAnswers({});
        setShowHistory(false);
    };

    const progress = ((current + 1) / QuestionBank.length) * 100;

    if (showScore) {
        return (
            <div className="quiz-container">
                <div className="score-section">
                    <h2>Quiz Completed!</h2>
                    <h3>Your Score: {score} / {QuestionBank.length}</h3>
                    <p>Percentage: {Math.round((score / QuestionBank.length) * 100)}%</p>
                    <div className="score-buttons">
                        <button onClick={restartQuiz} className="restart-btn">Restart Quiz</button>
                        <button onClick={() => setShowHistory(!showHistory)} className="history-btn">
                            {showHistory ? 'Hide' : 'Show'} History
                        </button>
                    </div>
                    {showHistory && (
                        <div className="history-section">
                            <h3>Attempt History</h3>
                            {attemptHistory.length === 0 ? (
                                <p>No attempts yet</p>
                            ) : (
                                <>
                                    {attemptHistory.map((attempt, index) => (
                                        <div key={index} className="attempt-item">
                                            <p><strong>Attempt {index + 1}:</strong> {attempt.date}</p>
                                            <p>Score: {attempt.score}/{attempt.total} ({Math.round((attempt.score / attempt.total) * 100)}%)</p>
                                        </div>
                                    ))}
                                    <button onClick={clearHistory} className="clear-history-btn">Clear History</button>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="quiz-container">
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                <span className="progress-text">{current + 1} / {QuestionBank.length}</span>
            </div>

            <div className="question-section">
                <h1>{current + 1}. {QuestionBank[current].question}</h1>

                <div className="options-section">
                    {QuestionBank[current].options.map((option, i) => (
                        <div
                            key={i}
                            className={`option-item ${selectedAnswers[current] === i ? 'selected' : ''}`}
                            onClick={() => handleAnswerSelect(current, i)}
                        >
                            <input
                                type="radio"
                                name={`question-${current}`}
                                id={`option-${current}-${i}`}
                                checked={selectedAnswers[current] === i}
                                onChange={() => handleAnswerSelect(current, i)}
                                readOnly
                            />
                            <label htmlFor={`option-${current}-${i}`}>{option}</label>
                        </div>
                    ))}
                </div>

                <div className="navigation-buttons">
                    <button
                        onClick={handlePrevious}
                        disabled={current === 0}
                        className="nav-btn prev-btn"
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        className="nav-btn next-btn"
                    >
                        {current === QuestionBank.length - 1 ? 'Submit' : 'Next'}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default QuizPage