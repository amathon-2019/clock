import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import LogoImage from './Logo.svg'

let frameId: any

function paddingNumber(num: number) {
  const str = '' + num
  const pad = '00'
  const ans = pad.substring(0, pad.length - str.length) + str

  return ans
}

const App: React.FC = () => {
  const [hour, setHour] = useState('')
  const [minute, setMinute] = useState('')
  const [second, setSecond] = useState('')

  const awaitRequestFrameAndUpdateCount = useCallback(() => {
    frameId = requestAnimationFrame(() => {
      const date = new Date()

      setHour(paddingNumber(date.getHours()))
      setMinute(paddingNumber(date.getMinutes()))
      setSecond(paddingNumber(date.getSeconds()))

      return awaitRequestFrameAndUpdateCount()
    })
  }, [])

  useEffect(() => {
    awaitRequestFrameAndUpdateCount()

    return () => window.cancelAnimationFrame(frameId)
  }, [awaitRequestFrameAndUpdateCount])

  return (
    <div className='App'>
      <div className='App-Logo'>
        <img src={LogoImage} alt='logo' />
      </div>
      <div className='App-Clock'>
        {hour}:{minute}:{second}
      </div>
    </div>
  )
}

export default App;
