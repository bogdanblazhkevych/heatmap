'use client'
import styles from './page.module.css'

export default function Home () {

  let sessionData:{
    x: number,
    y: number
  }[] = []

  function handleMouseMove (e: MouseEvent) {
    console.log("collecting mouse data....")
    let xCord = e.clientX
    let yCord = e.clientY
    let node = {
      x: xCord,
      y: yCord
    }
    sessionData.push(node)
  }

  function handleStart () {
    window.addEventListener("mousemove", handleMouseMove)
  }

  function handleStop () {
    console.log("stoped collecting mouse data")
    console.log(sessionData)
    window.removeEventListener("mousemove", handleMouseMove)
    mapMouseMovement()
  }

  function mapMouseMovement () {
    let canvas = document.getElementById('canvas') as HTMLCanvasElement
    canvas.height = window.innerHeight
    canvas.width = window.innerWidth
    if (!canvas) return
    let context = canvas.getContext('2d')
    if (!context) return

    context.fillStyle = "blue"
    sessionData.forEach(node => {
      context?.fillRect(node.x, node.y, 1, 1)
    })
  }

  return (
    <main className={styles.main}>

      <div className={styles.buttonwrapper}>
        <button onClick={handleStart}>start</button>
        <button onClick={handleStop}>stop</button>
      </div>

      <canvas id="canvas" className={styles.mapcanvas}></canvas>

    </main>
  )
}
