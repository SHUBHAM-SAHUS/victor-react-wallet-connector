import './App.css';
import { router } from './Router';
import { WagmiProvider } from './connector/context';
import { RouterProvider } from 'react-router-dom';

window.Buffer = window.Buffer || require('buffer').Buffer;

function App() {
  return (
    <WagmiProvider>
      <RouterProvider router={router} />
    </WagmiProvider>
  );
}

export default App;
