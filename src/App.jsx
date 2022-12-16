
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainLayout from './page/layout/mainLayout'
import QuizProtection from './page/quizProtection'
import Quiz from './page/quiz'
import QuizConfig from './page/quizConfig'

import { useGlobal } from './contex'
const App = () => {
  const { data } = useGlobal();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />} >
          <Route index element={<QuizConfig />} />
          <Route path="quiz" element={<QuizProtection data={data}  > <Quiz data={data} /> </QuizProtection>} />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
