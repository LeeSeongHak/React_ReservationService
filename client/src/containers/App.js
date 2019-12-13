import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReservationContainer from './ReservationContainer';
import './App.css';

const App = () => {
    return (
        <div className='App'>
            <Header />
            <ReservationContainer />
            <Footer />
        </div>
    );
}

export default App;