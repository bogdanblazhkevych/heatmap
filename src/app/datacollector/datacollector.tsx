'use client'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import React from 'react'

interface MouseCordinatesInterface {
  x: number,
  y: number
}

interface SessionInterface {
  sessionName: string,
  mouseMoveData: MouseCordinatesInterface[],
  mouseDownData: MouseCordinatesInterface[]
}

interface SessionsInterface {
  [key: string]: SessionInterface
}

export default function DataCollector() {

  const [sessions, setSessions] = useState<SessionsInterface>({})

  const [currentSession, setCurrentSession] = useState<SessionInterface>()

  const [selectedSessions, setSelectedSessions] = useState<string[]>()

  useEffect(() => {
    mapSelected()
  }, [selectedSessions])

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    console.log("collecting mouse data....")
    let xCord = e.clientX
    let yCord = e.clientY
    let node = {
      x: xCord,
      y: yCord
    }
    // sessionData.push(node)
    setCurrentSession((prevValue) => {
      prevValue?.mouseMoveData.push(node)
      return prevValue
    })
  }, [])

  const handleMouseDown = React.useCallback((e: MouseEvent) => {
    let xCord = e.clientX
    let yCord = e.clientY
    let node = {
      x: xCord,
      y: yCord,
      click: true
    }
    // sessionData.push(node)
    setCurrentSession((prevValue) => {
      prevValue?.mouseDownData.push(node)
      return prevValue
    })
  }, [])

  function handleStart() {
    //create new session
    //collect session data
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mousedown", handleMouseDown)
    createNewSession();
  }

  function handleStop() {
    console.log(currentSession)
    setSessions((prevValue) => {
      if (!currentSession) return prevValue
      prevValue[currentSession.sessionName] = currentSession
      return prevValue
    })
    setCurrentSession(undefined);
    window.removeEventListener("mousemove", handleMouseMove)
    window.removeEventListener("mousedown", handleMouseDown)
    console.log("stoped collecting mouse data")
    console.log(sessions)

    // mapMouseMovement()
  }

  function createNewSession() {
    setCurrentSession({
      sessionName: `session${Object.keys(sessions ?? {}).length}`,
      mouseMoveData: [],
      mouseDownData: []
    })
    return
  }

  const mapSelected = () => {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    if (!canvas) return
    let context = canvas.getContext('2d')
    if (!sessions) return

    selectedSessions?.forEach((name) => {
      sessions[name].mouseDownData.forEach((node) => {
        drawSquare(context, "green", node.x, node.y, 3)
      })

      sessions[name].mouseMoveData.forEach((node) => {
        drawSquare(context, "blue", node.x, node.y, 1)
      })
    })
  }

  const drawSquare = (ctx: CanvasRenderingContext2D | null, color: string, squareX: number, squareY: number, size: number) => {
    if (!ctx) return
    ctx.fillStyle = color;
    ctx.fillRect(squareX, squareY, size, size);
  }

  const handleSessionSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    const _selectedSessions = value.split(',')
    setSelectedSessions(_selectedSessions)
  }

  return (
    <div className={styles.datacollectorwrapper}>
        {/* <div className={styles.datacollectorcontainer}> */}
            <div className={styles.buttonwrapper}>
                <button onClick={handleStart}>start</button>
                <button onClick={handleStop}>stop</button>
                <select onChange={handleSessionSelectChange}>
                <option value={Object.keys(sessions)}>All</option>
                {Object.keys(sessions).map((session, index) => {
                    return (
                    <>
                        <option value={[session]}>{session}</option>
                    </>
                    )
                })}
                </select>
            </div>
            <canvas id="canvas" className={styles.mapcanvas}></canvas>
        {/* </div> */}
    </div>
  )
}
