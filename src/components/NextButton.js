import React from 'react'

const NextButton = ({dispatch, answer, index, total}) => {
    if (answer ===null) return null
    console.log(index, total)
    if(index < total-1)
  return (
    <button className='btn btn-ui' onClick={()=>dispatch({type:'nextQuestion'})} >
        Next
    </button>
  )

  if(index === total-1)
    return (
    <button className='btn btn-ui' onClick={()=>dispatch({type:'finish'})} >
        Finish
    </button>
  )
}

export default NextButton