import React from 'react'
import Header from './components/Header'
import About from './components/About'
import Projects from './components/Projects'
import Testimonails from './components/Testimonails'
import Contact from './components/Contact'
import Available_projects from './components/Available_projects'
import Land from './components/Land'
import RentPrice from './components/models/RentPrice'
const App = () => {
  return (
    <div className='w-full overflow-hidden'>
      <Header/>
      <Projects/>
      <Available_projects/>
      <Land/>
      <Testimonails/>
      <About/>
      <RentPrice/>
    </div>
  )
}

export default App