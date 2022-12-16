import { useGlobal } from "../contex";
import React, { useEffect, useState, useRef } from 'react';
import dataCategory from "../data";
import { useNavigate } from "react-router-dom";
const QuizConfig = () => {
    const {
        category,
        setCategory,
        difficulty,
        setDifficulty,
        type,
        setType,
        amount,
        setAmount,
        requestObject,
        setSearchUrl,
        loading,
        data
    } = useGlobal();

    const handleSubmit = (e) => {
        e.preventDefault();
        let url = "https://opentdb.com/api.php?"
        let reqArray = Object.entries(requestObject);
        let reg = new RegExp("any");
        let filteredReqArray = reqArray.filter(([key, value]) => {
            return !reg.test(value);
        })
        filteredReqArray.forEach((item) => {
            url += `&${item[0]}=${item[1]}`;
        })

        setSearchUrl(url);
    }

    const categoryHandler = (e) => {
        let category = e.target.value;
        let newData = dataCategory.find((item) => {
            return item.name === category;
        })
        setCategory(newData.id)
    }
    useEffect(() => {
        document.getElementById("questionNumber").defaultValue = "10";
    }, [])
    let initial = useRef(true)
    useEffect(() => {
        if (initial.current) {
            initial.current = false;
        }
        else {
            localStorage.setItem("data", JSON.stringify(data));
            console.log(data);
        }
    }, [data])
    const navigate = useNavigate();
    useEffect(() => {

        if (data.response_code === 0) {
            console.log(data.response_code);
            navigate("/quiz");
        }
    }, [data])
    return (
        <main className="setQuiz">
            <h2>quiz setting</h2>
            <div className="formContainer">
                <form className="form" onSubmit={handleSubmit}>
                    <label htmlFor="questionNumber">
                        number of questions
                    </label>
                    <input type="number" name="questionNumber" id="questionNumber" min={10} max={50} value={amount} onChange={(e) => { setAmount(e.target.value) }} />
                    <label htmlFor="category">category</label>
                    <select name="category" id="category" onChange={categoryHandler} defaultValue="any category">
                        <option value="any category">any category</option>
                        <option value="general knowledge">general knowledge</option>
                        <option value="art">art</option>
                        <option value="nature">nature</option>
                        <option value="history">history</option>
                        <option value="sport">sport</option>
                    </select>
                    <label htmlFor="difficulty">difficulty</label>
                    <select name="difficulty" id="difficulty" onChange={(e) => { setDifficulty(e.target.value) }} defaultValue="any difficulty">
                        <option value="any difficulty">any difficulty</option>
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                    </select>
                    <label htmlFor="type">type</label>
                    <select name="type" id="type" onChange={(e) => { setType(e.target.value) }} defaultValue="any type">
                        <option value="any type" >any type</option>
                        <option value="multiple">multiple choice</option>
                        <option value="boolean">true/false</option>
                    </select>
                    <button type="submit">submit</button>
                </form>
            </div>
            <p className="error">{data.response_code === 1 ? "not found" : ""}</p>
        </main>
    )
}
export default QuizConfig;