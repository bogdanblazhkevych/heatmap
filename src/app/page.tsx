import styles from './page.module.css'
import React from 'react'
import DataCollector from './datacollector/datacollector'

export default function Home() {
  return (
    <main className={styles.main}>

      <DataCollector />
      some content
    </main>
  )
}
