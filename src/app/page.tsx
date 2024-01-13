import styles from './page.module.css'
import React from 'react'
import DataCollector from './datacollector/datacollector'
import CardThree from './cardthree/cardthree'

export default function Home() {
  return (
    <main className={styles.main}>

      <DataCollector />
      <div className={styles.cardgrid}>
        <CardThree title="some basic card probably saying something"
                  paragraph='this is very important information. we will use this to test user input and where the user is most interested by looking at data collected from the mouse location'
                  clickable={false}
                  id="cardone"/>
        <CardThree title="this card is slightly different from the previous"
                  paragraph='pretend this is a module for something like "potential employee aquisitions". the ai will inteligently match you to some pre-vetted people and um yeah they will be here'
                  clickable={false}
                  id="cardtwo"/>
        <CardThree title="this will be displaying KPIs"
                  paragraph='over here you can see how your failing buisnesss is failing. it will take what you already know (that ur broke) and display it nicely for you right here.'
                  clickable={false}
                  id="cardthree"/>
        <CardThree title="probably displaying your projects"
                  paragraph='in this section the platform will show you what pathetic vetures you took to try and save your business and their status. news flash, they are failing.'
                  clickable={false}
                  id="cardfour"/>
        <CardThree title="showing you payroll and staf evaluations"
                  paragraph='over here you can see all your employees who definantly do not hate you and their respective salaries. why are you paying your secretary 3x that of your senior dev?'
                  clickable={false}
                  id="cardfive"/>
        <CardThree title="metric showing potential market shart"
                  paragraph='a very in your face graph showing you how popular your services would be if you were good at your job. there clearly is demand and you are doing something wrong.'
                  clickable={false}
                  id="cardsix"/>

      </div>
    </main>
  )
}
