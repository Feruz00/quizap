import React, { useEffect, useReducer } from 'react'
import Header from './Header'
import Main from './Main'
import Loader from './Loader'
import Error from './Error'
import StartScreen from './StartScreen'
import Questions from './Questions'
import NextButton from './NextButton'
import Progress from './Progress'
import FinishScreen from './FinishScreen'
import Footer from './Footer'
import Timer from './Timer'

const initialState = {
    questions: [],
    //loading error ready active finished
    status: 'loading',
    index:0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null
}

const reducer = (state, action)=>{
    switch (action.type) {
        case 'tick':
            return {
                ...state,
                secondsRemaining: state.secondsRemaining - 1,
                status: state.secondsRemaining === 0 ? 'finished': state.status
            }
        case 'dataReceived':
            return{
                ...state,
                questions: action.payload,
                status: 'ready'
            }
        case 'dataFailed':
            return {
                ...state,
                status: 'error'
            }
        case 'start':
            return{
                ...state,
                secondsRemaining: state.questions.length *30,
                status: 'active'
            }
        case "newAnswer":
            const question = state.questions.at(state.index)
            return{
                ...state, 
                answer: action.payload,
                points: action.payload === question.correctOption ? state.points + question.points: state.points
            }
        case 'nextQuestion':

            return {
                ...state,
                index: state.index+1,
                answer: null
            }
        case 'finish':
            return {
                ...state,
                status:'finished',
                
                highscore: state.points > state.highscore ? state.points : state.highscore
            }
        case 'restart':
            return {
                ...initialState,
                questions: state.questions,
                status:'ready'}
            // return {...state, points: 0, highscore:0, index:0, answer: null, status:'ready'}
        default:
             throw new Error("Unknown action")
    }
}

const App = () => {

    const [{questions, status, index, answer, points, highscore, secondsRemaining}, dispatch] = useReducer(reducer, initialState)


    const numQuestions = questions.length
    const maxPossiblePoints = questions.reduce( (prev, cur)=>{
        return prev + cur.points
    }, 0 )

    useEffect( ()=>{
        fetch('http://localhost:9000/questions')
            .then(res=>res.json())
            .then(data=>{
                dispatch({type: 'dataReceived', payload:data})
            })
            .catch(err=>{
                dispatch({type: 'dataFailed'})
            }) 
    } , [])
  return (
    <div className='app'>
        <Header />

        <Main>
            {status === 'loading' && <Loader />}
            {status === 'error' && <Error />}
            {status === 'ready' && <StartScreen dispatch={dispatch} numQuestions={numQuestions} />}
            {status === 'active' && (
                <>
                    <Progress index={index} numQuestions={numQuestions} points={points} answer={answer} total={maxPossiblePoints} />
                    <Questions answer={answer} dispatch={dispatch} question={questions[index]} />
                    <Footer>
                        <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
                        <NextButton answer={answer} dispatch={dispatch} index={index} total={numQuestions} />    
                    </Footer>
                </>
            )}
            {status === 'finished' && <FinishScreen total={maxPossiblePoints} points={points} highscore={highscore} dispatch={dispatch} /> }
            
        </Main>
    </div>
  )
}

export default App