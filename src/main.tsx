import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
);
