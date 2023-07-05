import React from 'react'

const Options = ({question, dispatch, answer}) => {
  const hasAnswered = answer!==null

  return (
    <div className='options'>
            {question.options.map((option, index)=><button 
              onClick={()=>dispatch({type: 'newAnswer', payload: index})}
              disabled={answer!==null}
              key={option} className={`btn btn-option ${index===answer ? 'answer': ''} 
              ${ hasAnswered ? 
                  index===question.correctOption
                    ? ' correct'
                    :' wrong'
                  :''} `}>
                {option}
            </button>)}
    </div>
  )
}

export default Options