import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import Banner from './componets/Banner';
import Header from './componets/Header';
import HomeBanner from './componets/HomeBanner';
import List from './componets/List';
import Login from './componets/Login';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={
            <>
              <Header />
              <HomeBanner/>
            </>
          } />
          <Route path="/login" element={
            <Login />
          } />
          <Route path="/register" element={
            <Login />
          } />
          <Route path="/dashboard" element={
            <>
              <Header />
              <Banner />
              <List param={"originals"} title={"Netflix Originals"}/>
              <List param={"trending"} title={"Trending Now"}/>
              <List param={"top_rated"} title={"Top Rated"}/>
              <List param={"now_playing"} title={"Now Playing"}/>
              <List param={"popular"} title={"Popular"}/>
              <List param={"upcoming"} title={"Upcoming"}/>
            </>
          } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
