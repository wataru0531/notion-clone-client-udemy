/**************************************************************

この開発ではあえて、Reactのバージョンを17にダウングレードしている

***************************************************************/
import './App.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline }  from "@mui/material"; // リセットCSSのようなもの。必ず入れる
import { blue } from "@mui/material/colors";

import AuthLayout from './components/layout/AuthLayout';
import Login from "./pages/Login";
import Register from './pages/Register';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Memo from './pages/Memo';


function App() {
  // アプリ全体のテーマ決める
  const theme = createTheme({
    palette: { primary: blue }, 

  })

  return (
    <ThemeProvider theme={ theme }>
      <CssBaseline />

      <BrowserRouter>
        <Routes>
          {/* 認証周りのページ */}
          <Route path="/" element={ <AuthLayout /> }>
            <Route path="login" element={ <Login /> } />
            <Route path="register" element={ <Register /> } />
          </Route>
          
          {/* Notion本体のページ */}
          <Route path="/" element={<AppLayout />}>
            {/* index...親のパスと同じ */}
            <Route index element={<Home />} />
            <Route path="memo" element={<Home />} />

            {/* メモ下層 ... 動的なページとする */}
            <Route path="memo/:memoId" element={ <Memo /> } />
          </Route>

        </Routes>

      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
