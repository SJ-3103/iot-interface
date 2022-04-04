import { Link,Route,Routes } from 'react-router-dom'
import './App.css'

function App() {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="#" element={<About />} /> */}
    </Routes>
  )
}

function Home(){
  return(
    <div className="App">
      <header className='header'>
        <nav>
          <ul>
            <li><Link to="#">Heading</Link></li>
          </ul>
          <ul>
            <li><Link to="#">About</Link></li>
            <li><Link to="#">Images</Link></li>
            <li><Link to="#">Mails Sent</Link></li>
          </ul>
        </nav>
      </header>

      <div className="data">
          <Chart />
          <Table />
      </div>

    </div>
  )
}

function Chart(){
  return (
    <div className="chart">
      <p>Chart</p>
    </div>
  )
}

function Table() {
  return (
    <div className="table">
      <p>Table</p>
    </div>
  )
}

export default App
