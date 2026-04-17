import { useState } from 'react'
import { useQuery } from '@apollo/client/react'
import { gql } from './__generate__'
import './App.css'
import PostItem from './components/PostItem'
import { Link } from 'react-router'

export const POSTS = gql(`
  query getAllPost {
  posts {
    id
    title
    content
    published
    author {
      id
      name
      email
    }
  }
}
  
  `)

function App() {
  const { data, loading, error } = useQuery(POSTS)

 

  return (
    <div className="container">
      <header className="header">
        <h1>Latest Insights</h1>
        <p>Exploring the world of GraphQL & React</p>
        <Link to="/post/create">Create Post</Link>
      </header>

      {loading && (
        <div className="status-message">
          <div className="spinner"></div>
          <p>Fetching amazing stories...</p>
        </div>
      )}

      {error && (
        <div className="status-message error-card">
          <p>Oops! {error.message}</p>
        </div>
      )}

      <div className="post-grid">
        {data?.posts?.map((post) => (
          <PostItem 
            key={post.id} 
            post={post} 
           
          />
        ))}
      </div>
      
    </div>
  )
}

export default App