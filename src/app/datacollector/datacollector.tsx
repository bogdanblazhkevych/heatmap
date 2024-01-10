'use client'
import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import React from 'react'

interface MouseCordinatesInterface {
  x: number,
  y: number
}

// interface MouseMoveDataInterface extends MouseCordinatesInterface {
//   element: HTMLElement
// }

interface ElementNodeInterface {
  targetCount: number,
  element: HTMLElement
}

interface ElementDataInterface {
  [id: string]: ElementNodeInterface
}

interface SessionInterface {
  sessionName: string,
  mouseMoveData: MouseCordinatesInterface[],
  mouseDownData: MouseCordinatesInterface[],
  elementData: ElementDataInterface
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

  // let test: HTMLElement[] = []

  const handleMouseMove = React.useCallback((e: MouseEvent) => {
    console.log("collecting mouse data....")
    let xCord = e.clientX
    let yCord = e.clientY
    let node = {
      x: xCord,
      y: yCord,
      // element: e.target as HTMLElement
    }
    let element = e.target as HTMLElement
    setCurrentSession((prevValue) => {
      if (!prevValue) return
      prevValue?.mouseMoveData.push(node)
      if (element.id) {
        if (prevValue.elementData[element.id]) {
          prevValue.elementData[element.id].targetCount ++
        } else {
          prevValue.elementData[element.id] = {
            targetCount: 0,
            element: element
          }
        }
      }
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
    // let element = e.target as HTMLElement
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
    // console.log(test)

    // mapMouseMovement()
  }

  function createNewSession() {
    setCurrentSession({
      sessionName: `session${Object.keys(sessions ?? {}).length}`,
      mouseMoveData: [],
      mouseDownData: [],
      elementData: {}
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
        // drawOutlineFromElement(context, "yellow", node.element)
      })

      const highestTargetCount = getHighestTargetCount(sessions[name].elementData)

      Object.keys(sessions[name].elementData).forEach((key) => {
        const node = sessions[name].elementData[key]
        const appature = node.targetCount / highestTargetCount
        const color = `rgba(251, 255, 0, ${appature})`
        drawOutlineFromElement(context, color, node.element, 2)
      })
    })
  }

  const getHighestTargetCount = (elementData: ElementDataInterface) => {
    let currentCount = 0;
    Object.keys(elementData).forEach((key) => {
      if (elementData[key].targetCount > currentCount) {
        currentCount = elementData[key].targetCount
      }
    })
    return currentCount
  }

  const drawOutlineFromElement = (ctx: CanvasRenderingContext2D | null, color: string, element: HTMLElement, width?: number,) => {
    if (!ctx) return
    const boundingBox = element.getBoundingClientRect();
    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.strokeRect(boundingBox.x, boundingBox.y, boundingBox.width, boundingBox.height);
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
                        <option key={index} value={[session]}>{session}</option>
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
