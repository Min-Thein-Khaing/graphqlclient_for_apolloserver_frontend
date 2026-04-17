import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router'
import { POSTS } from '../App'
import { gql } from '../__generate__'
import { useMutation, useQuery } from '@apollo/client/react'

const GET_POST_BY_ID = gql(`
  query GetPostToUpdate($id: ID!) {
    post(id: $id) {
      id
      title
      content
      published
      author {
        id
      }
    }
  }
`)

const UPDATE_POST = gql(`
  mutation UpdatePost($updatePostId: ID!, $input: UpdatePostInput!) {
    updatePost(id: $updatePostId, input: $input) {
      code
      success
      message
      post {
        id
        title
        content
        published
      }
    }
  }
`)

const PostUpdatePage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formState, setFormState] = useState({
    title: "",
    content: "",
    published: false,
  })

  const { data: queryData, loading: queryLoading } = useQuery(GET_POST_BY_ID, {
    variables: { id: id || "" }
  })

  useEffect(() => {
    if (queryData?.post) {
      setFormState({
        title: queryData.post.title || "",
        content: queryData.post.content || "",
        published: queryData.post.published || false,
      })
    }
  }, [queryData])

  const [updatePost, { loading: updateLoading }] = useMutation(UPDATE_POST, {
    refetchQueries: [{ query: POSTS }],
    onCompleted: (data) => {
      if (data?.updatePost?.success) {
        navigate("/");
      }
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await updatePost({
      variables: {
        updatePostId: id || "",
        input: {
          title: formState.title,
          content: formState.content,
          published: formState.published,
          // authorId can stay same
        }
      }
    })
  }

  if (queryLoading) return <div className="container">Loading post data...</div>

  return (
    <div className="container">
      <Link to="/" className="btn-back">← Back</Link>
      <h1 className='text-black'>Update Post</h1>
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={formState.title} 
            onChange={(e) => setFormState({ ...formState, title: e.target.value })} 
            placeholder="Title" 
            required
          />
        </div>
        
        <div className="form-group">
          <label>Content</label>
          <textarea 
            value={formState.content} 
            onChange={(e) => setFormState({ ...formState, content: e.target.value })} 
            placeholder="Content" 
            rows={6}
            required
          />
        </div>

        <div className="form-group checkbox-group">
          <input 
            type="checkbox" 
            id="published"
            checked={formState.published} 
            onChange={(e) => setFormState({ ...formState, published: e.target.checked })} 
          />
          <label htmlFor="published">Published</label>
        </div>

        <div className="form-actions">
           <button type="submit" className="btn btn-primary" disabled={updateLoading}>
              {updateLoading ? "Updating..." : "Update Post"}
           </button>
           <Link to="/" className="btn btn-secondary">Cancel</Link>
        </div>
      </form>
    </div>
  )
}

export default PostUpdatePage