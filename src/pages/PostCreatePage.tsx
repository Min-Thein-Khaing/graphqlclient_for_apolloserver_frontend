import React from 'react'
import { Link } from 'react-router'
import { useMutation } from '@apollo/client/react'
import { gql } from '../__generate__'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { POSTS } from '../App'
const Create_POST = gql(`
        mutation CreatePost($input: CreatePostInput!) {
  createPost(input: $input) {
    code
    success
    message
    post {
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
}
    `)
const PostCreatePage = () => {
    const navigate = useNavigate()
    const [formState, setFormState] = useState({
        title: "",
        content: "",
        published: false,
        authorId: ""
    })
    const [createPost, { loading, error, data }] = useMutation(Create_POST, {
        onCompleted: (data) => {
            if (data?.createPost?.success) {
                navigate("/");
            }
        },
        refetchQueries: [{
            query:POSTS,
            }]
    })
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await createPost({
            variables: {
                input: {
                    title: formState.title,
                    content: formState.content,
                    published: formState.published,
                    authorId: "27c88e1b-6740-422f-8c58-f47d915f6bb6"
                }
            }
        })
    }
    return (
        <div>
            <Link to="/">Back</Link>
            <h1 className='text-black'>Create Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" value={formState.title} onChange={(e) => setFormState({ ...formState, title: e.target.value })} name="title" placeholder="Title" />
                <input type="text" value={formState.content} onChange={(e) => setFormState({ ...formState, content: e.target.value })} name="content" placeholder="Content" />
                <input type="checkbox" checked={formState.published} onChange={(e) => setFormState({ ...formState, published: e.target.checked })} name="published" placeholder="Published" />
                <button type="submit">{loading ? "Creating..." : "Create"}</button>
            </form>
        </div>
    )
}

export default PostCreatePage