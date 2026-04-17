import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter as Router, Routes, Route } from "react-router";
import PostDetailPage from './pages/PostDetailPage.tsx'
import PostCreatePage from './pages/PostCreatePage.tsx'
import PostUpdatePage from './pages/PostUpdatePage.tsx'


const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:4000' }),
  cache: new InMemoryCache(),
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/post/:id" element={<PostDetailPage />} />
          <Route path="/post/create" element={<PostCreatePage />} />
          <Route path="/post/update/:id" element={<PostUpdatePage/>} />
        </Routes>
      </Router>
    </ApolloProvider>
  </StrictMode>,
)
