import React, { useContext, useEffect, useState, useRef } from "react";
const appContext = React.createContext();
const AppProvider = ({ children }) => {
    const getLocalStorage = () => {
        const data = localStorage.getItem("data");
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }
    const [data, setData] = useState(getLocalStorage());
    const [loading, setLoading] = useState(true);
    const initial = useRef(true)
    const [searchUrl, setSearchUrl] = useState('');
    const fetchQuestions = async (url) => {
        setLoading(true);
        const response = await fetch(url);
        const jsonResponse = await response.json();
        setData(jsonResponse);
        setLoading(false);

    }
    useEffect(() => {
        if (initial.current) {
            initial.current = false;
        } else {
            fetchQuestions(searchUrl);
        }
    }, [searchUrl])




    const [category, setCategory] = useState("any category");
    const [difficulty, setDifficulty] = useState("any difficulty");
    const [type, setType] = useState("any type");
    const [amount, setAmount] = useState(10);

    const requestObject =
    {
        category: category,
        amount: amount,
        difficulty: difficulty,
        type: type
    }
    return <appContext.Provider
        value={
            {
                category,
                setCategory,
                difficulty,
                setDifficulty,
                type,
                setType,
                amount,
                setAmount,
                requestObject,
                searchUrl,
                setSearchUrl,
                loading,
                data,
                setData

            }
        }>
        {children}
    </appContext.Provider>
}

const useGlobal = () => {
    return useContext(appContext);
}

export { AppProvider, useGlobal };