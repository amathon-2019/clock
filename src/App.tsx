import React, { useState, useEffect, useCallback } from 'react';
import './App.css';
import LogoImage from './logo.svg'

const END_DATE = new Date('2019-09-01T00:30:00.000Z').getTime()

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
      const remainMilliseconds = END_DATE - new Date().getTime()

      const date = new Date(remainMilliseconds)

      setHour(paddingNumber(date.getUTCHours()))
      setMinute(paddingNumber(date.getUTCMinutes()))
      setSecond(paddingNumber(date.getUTCSeconds()))

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
      <div className='App-Clock-Caption'>
        남은시간
      </div>
      <div className='App-Clock'>
        {hour}:{minute}:{second}
      </div>
    </div>
  )
}

export default App;
