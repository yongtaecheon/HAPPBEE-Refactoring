import './styles/App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Nav from './components/Nav'
import Main from './components/Main';
import Home from './components/Home';
import Item from './components/Item';
import Chat from './components/Chat';
import Header from './components/Header';
import Hostpital from './components/Hostpital';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Survey from './components/Survey';
import SurveyList from './components/SurveyList';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <BrowserRouter>
        <Header />
        <QueryClientProvider client={queryClient}>
        <main>
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/survey' element={<Survey />} />
            <Route path='/survey/:id' element={<SurveyList />} />
            <Route path='/home' element={<Home />} />
            <Route path='/home/item' element={<Item />} />
            <Route path='/chat' element={<Chat />} />
            <Route path='/hospital' element={<Hostpital/>}/>
          </Routes>
          </main>
        </QueryClientProvider>
        <Nav />
        </BrowserRouter>
    </>
  )
}

export default App
