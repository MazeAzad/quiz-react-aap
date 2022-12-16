import { Navigate } from "react-router-dom";

const QuizProtection = ({ children, data }) => {
    if (data.response_code === 0)
        return children;
    else
        return <Navigate to='/' />
}

export default QuizProtection;