import React from 'react'

const Progress = ({index, numQuestions, points, total, answer}) => {
  return (
    <header className='progress'>
        
        <progress max={total} value={points + Number(answer !==null)}></progress>

        <p>Question <strong>{index+1}</strong> / {numQuestions} </p>
        <p><strong>{points}</strong>/ {total}</p>
    </header>
  )
}

export default Progress