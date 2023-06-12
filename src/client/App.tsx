import * as React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import Home from './views/Home';
import Timeline from './views/Timeline';
import ChirpDetails from './views/ChirpDetails';
import Edit from './views/Edit';
import Create from './views/Create';
import Profile from './views/Profile';
import Login from './views/Login';
import Register from './views/Register';
import NotFound from './views/NotFound';

const App = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <div className="container mt-5 text-bg-primary">
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/chirps' element={<PrivateRoute><Timeline /></PrivateRoute>} />
                    <Route path='/chirps/create' element={<PrivateRoute><Create /></PrivateRoute>} />
                    <Route path='/chirps/:id' element={<ChirpDetails />} />
                    <Route path='/chirps/:id/edit' element={<PrivateRoute><Edit /></PrivateRoute>} />
                    <Route path='/users/:id' element={<Profile />} />
                    <Route path='*' element={<NotFound />} />
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App;
