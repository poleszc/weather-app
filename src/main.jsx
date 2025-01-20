import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Provider } from 'react-redux'

import { App } from './App'
// import { store } from './store.js' // Store dla całek aplkacji


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}> */}
      <App />
    {/* </Provider> */}
  </StrictMode>
)
