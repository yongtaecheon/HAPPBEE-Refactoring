import "./styles/App.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Nav from "./components/Nav/Nav";
import Main from "./components/Main/Main/Main";
import Home from "./components/Main/Home/Home";
import Item from "./components/Main/Home/Item/Item";
import Chat from "./components/Main/Chat/Chat";
import Header from "./components/Header/Header";
import Hostpital from "./components/Main/Hospital/Hostpital";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Survey from "./components/Main/Survey/Survey";
import SurveyList from "./components/Main/Survey/SurveyList";
import { useAppSelector } from "./redux/store";

function MainContent() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/survey/:id" element={<SurveyList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/home/item" element={<Item />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/hospital" element={<Hostpital />} />
      </Routes>
    </main>
  );
}

export default function App() {
  const queryClient = new QueryClient();
  const isLoggedIn = useAppSelector((state) => state.login.isLoggedIn);
  return (
    <>
      <BrowserRouter>
        <Header />
        <QueryClientProvider client={queryClient}>
          <MainContent />
        </QueryClientProvider>
        {isLoggedIn && <Nav />}
      </BrowserRouter>
    </>
  );
}
