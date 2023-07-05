import React from 'react'

const FinishScreen = ({points, total, highscore, dispatch}) => {
    const per = (points/total) * 100
    let emoji;

    if(per ===100) emoji = '🏆'
    if( per>=80 && per <100 ) emoji = '🎉'
    if( per>=50 && per <80 ) emoji = '🤗'
    if( per>0 && per <50 ) emoji = '🙁'
    if(per===0) emoji='🤦‍♂️'
  return (
    <>
        <p className='result'>
            You scored <span>{emoji}</span> <strong>{points}</strong> out of {total} ({Math.ceil(per)}%)
        </p>
        <p className='highscore'>(Highscore {highscore} )</p>
    
        <button className='btn btn-ui' 
            onClick={()=>dispatch({type: 'restart'})}
        >
            Restart Quiz
        </button>
    </>
  )
}

export default FinishScreen