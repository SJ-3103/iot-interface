import { Route, Routes } from 'react-router-dom'

import Home from './Home'
import Emails from './Emails'
import About from './About'
import Analysis from './Analysis'
import EmailData from './EmailData'

export default function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/emails" element={<Emails />} />
        <Route path="/email/details" element={<EmailData />}/>
    </Routes>
  )
}