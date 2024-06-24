import { Router, RouterProvider, createBrowserRouter } from 'react-router-dom';
import './App.css';
import DigimonList from './pages/DigimonList';
import { ChakraProvider } from '@chakra-ui/react';
import DigimonDetalhes from './pages/DigimonDetalhes';
import LoginPage from './pages/LoginPage';

function App() {
  
  const routes = createBrowserRouter([
    {
      path : "/digimons",
      element : <DigimonList></DigimonList>
    },
    {
      path: "/digimons/digimon/:id",
      element: <DigimonDetalhes></DigimonDetalhes>
    },
    {
      path: "/login",
      element: <LoginPage></LoginPage>
    }
  ])

  return (
    <ChakraProvider>
      <RouterProvider router={routes}></RouterProvider>
    </ChakraProvider>
  );
}

export default App;
