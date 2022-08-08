import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Mainpage from './Pages/MainPage/Mainpage';
import Regsiterpage from './Pages/RegisterPage/Regsiterpage';
import Loginpage from './Pages/LoginPage/Loginpage';
import AddProductPage from './Pages/AddProductPage/AddProductPage';
import NotFound from './Pages/NotFoundPage/NotFound';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={< Mainpage/>}/>
      <Route path="/register" element={< Regsiterpage/>}/>
      <Route path="/login" element={< Loginpage/>}/>
      <Route path="/addProduct" element={< AddProductPage/>}/>

      <Route path="*" element={<NotFound />} />
      
    </Routes>
  </BrowserRouter>
  );
}

export default App;
