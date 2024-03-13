import './App.css';
import  React,{lazy,Suspense} from "react"
import Nav from "./Sectionfiles/Nav"
import Main from "./Sectionfiles/Main"
import Footer from "./Sectionfiles/Footer"
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Review from './Sectionfiles/Review';
import { AuthProvider } from './Sectionfiles/auth';


const Menu = React.lazy(()=>import('./Sectionfiles/Menu'))
const BookingPage = React.lazy(()=> import('./Sectionfiles/Booking'))
const Login = React.lazy(()=> import('./Sectionfiles/Login'))
const Register = React.lazy(()=>import('./Sectionfiles/Register'))
const Cart = React.lazy(()=> import('./Sectionfiles/Cart') )



function App() {
  return (
    <main>
     <AuthProvider>
      <Nav/>
      <Routes>
    <Route path="/" element={
    <Main />}></Route>

    <Route path="/booking" element={
      <Suspense fallback={<div>Loading...</div>}>
    <BookingPage />
    </Suspense>
    }></Route>

    <Route path="/login" element ={
      <Suspense fallback={<div>Loading...</div>}>
    <Login/>
    </Suspense> }> 
    </Route>
    
    <Route path="/register" element ={
      <Suspense fallback={<div>Loading...</div>}>
    <Register/>
    </Suspense>
    }></Route>
    
    <Route path = "/menu" element ={
    <Suspense fallback={<div>Loading...</div>} >
      <Menu/>
    </Suspense>}></Route>
    
    <Route path = "/cart" element = {
    <Suspense fallback={<div>Loading...</div>}>
    <Cart/>
    </Suspense>
    }> 
    
    </Route>
    <Route path = "/review/:itemId" element= {<Review/>}></Route>
    </Routes>
      </AuthProvider>
    </main>
  );
}

export default App;
