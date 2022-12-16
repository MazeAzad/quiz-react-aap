import { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useGlobal } from "../contex";
const Quiz = () => {
    const { data, setData } = useGlobal();

    const getLocalStorage = () => {
        if (localStorage.getItem("questions")) {

            const items = localStorage.getItem('questions');
            return JSON.parse(items)
        }
        else

            return [];
    }
    const getEndFromStrong = () => {
        if (localStorage.getItem('end'))
            return localStorage.getItem('end');
        else
            return false;
    }
    const [end, setEnd] = useState(getEndFromStrong());
    const [newQuestions, setNewQuestions] = useState(getLocalStorage());
    const [correctAnswer, setCorrectAnswer] = useState(0);
    const navigate = useNavigate();
    const endExam = () => {
        newQuestions.map((question) => {
            if (question.correct_answer === question.userAnswer) {
                setCorrectAnswer((correctAnswer) => { return correctAnswer + 1 });
            }
        })
        setEnd(true);
        localStorage.setItem('end', true);
    }
    useEffect(() => {
        if (!localStorage.getItem('questions')) {
            const questions = data.results.map((item) => {
                const { question, correct_answer, category, incorrect_answers } = item;
                const answers = [];
                incorrect_answers.forEach((A) => {
                    answers.push(A);
                })
                answers.push(correct_answer);
                const shuffledAnswers = answers.sort((a, b) => 0.5 - Math.random());
                const questionObject = {
                    question: question,
                    correct_answer: correct_answer,
                    category: category,
                    answers: shuffledAnswers,
                    userAnswer: 'default',
                }
                return questionObject;
            })
            questions.map((question, index) => {
                question.id = index;
            })
            setNewQuestions(questions);
        }
    }, [])

    const anotherExam = () => {
        setData([]);
        localStorage.clear();
        navigate(-1);
    }

    const answerHandle = (id, answer) => {
        let q = newQuestions;
        const obj = q.find((item) => {
            return item.id === id;
        })
        obj.userAnswer = answer;
        setNewQuestions(() => { return [...q] });
        let JSONQ = JSON.stringify(newQuestions);
        localStorage.setItem("questions", JSONQ);

    }



    if (!end) {
        return (
            <main className="QuizContainer">
                {newQuestions.map((q) => {
                    const { question, answers, id, userAnswer } = q;
                    return <div className="question" key={id}>
                        <p className="questionTitle">
                            {id + 1}.{question}
                        </p>
                        <div className="answers">
                            {answers.map((answer, index) => {
                                return (
                                    <button key={index}
                                        className={`${answer === userAnswer ? "answerButtons clicked" : "answerButtons"}`}
                                        onClick={() => { answerHandle(id, answer) }}>
                                        {answer}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                })}
                <button className="finishButton" onClick={() => { endExam() }}  >end</button>
            </main >
        )
    }
    else {
        return (
            <main className="resultContainer">
                <div className="result">
                    you have answerd {correctAnswer} correctly
                    <button className="tryBtn" onClick={() => { anotherExam() }} >try another exam</button>
                </div>

            </main>
        )
    }
}

export default Quiz;