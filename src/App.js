import './App.css';
import  React from "react"
import Nav from "./Sectionfiles/Nav"
import Main from "./Sectionfiles/Main"
import Menu from "./Sectionfiles/Menu"
import Footer from "./Sectionfiles/Footer"
import BookingPage from "./Sectionfiles/Booking"
import Login  from "./Sectionfiles/Login"
import Cart from "./Sectionfiles/Cart"
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Register from './Sectionfiles/Register';
import Review from './Sectionfiles/Review';
import { AuthProvider } from './Sectionfiles/auth';

function App() {
  return (
    <main>
     <AuthProvider>
      <BrowserRouter><Nav></Nav>
      <Routes>
    <Route path="/" element={<Main />}></Route>
    <Route path="/booking" element={<BookingPage />}></Route>
    <Route path="/login" element ={<Login/>}> </Route>
    <Route path="/register" element ={<Register/>}></Route>
    <Route path = "/menu" element ={<Menu/>}></Route>
    <Route path = "/cart" element = {<Cart/>}> </Route>
    <Route path = "/review/:itemId" element= {<Review/>}></Route>
    </Routes>
      </BrowserRouter>
      <Footer></Footer>
      </AuthProvider> 
    </main>
  );
}

export default App;
