import Navbar from "./components/layout/Navbar";
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Footer from "./components/layout/footer";
import Alert from "./components/layout/Alert";
import Home from "./pages/Home";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import User from "./pages/User";
import {GithubProvider} from "./context/github/GitHubContext";
import {AlertProvider} from "./context/alert/AlertContext";
/*
* If we try to use links without the router than we get an error
* */
function App() {
  return (
      // PassingChildren to Github provider
      <GithubProvider>
          <AlertProvider>
          <Router>
              <div className="flex flex-col justify-between h-screen">
                  <Navbar/>
                  <main className='container mx-auto px-3 pb-12'>
                      <Alert/>
                      <Routes>
                          <Route path='/' element={<Home/>}/>
                          <Route path='/About' element={<About/>}/>
                          <Route path='/user/:login' element={<User/>}/>
                          <Route path='/notfound' element={<NotFound/>}/>
                          <Route path='/*' element={<NotFound/>}/>
                      </Routes>
                  </main>
                  <Footer/>
              </div>
          </Router>
          </AlertProvider>
      </GithubProvider>
  );
}

export default App;
