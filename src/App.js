import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Fotter from "./components/layout/footer";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
/*
* If we try to use links without the router than we get an error
* */
function App() {
  return (
    <Router>
        <div className="flex flex-col justify-between h-screen">
            <Navbar/>
            <main className='container mx-auto px-3 pb-12'>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/About' element={<About/>}/>
                    <Route path='/notfound' element={<NotFound/>}/>
                    <Route path='/*' element={<NotFound/>}/>
                </Routes>
            </main>
            <Fotter/>
        </div>
    </Router>
  );
}

export default App;
