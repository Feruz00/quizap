import React, { useEffect } from 'react'

const Timer = ({dispatch, secondsRemaining}) => {

    const min = Math.floor(secondsRemaining / 60)
    const seconds = Math.floor(secondsRemaining % 60)

    useEffect( ()=>{
        const interval = setInterval( ()=>{
            dispatch({type: 'tick'})
        }, 1000 )

        return ()=>clearInterval(interval)
    }, [dispatch] )
  return (
    <div className='timer'>
    {min<10?'0':''}{min}:
    {seconds<10?"0":""}
    {seconds}</div>
  )
}

export default Timer