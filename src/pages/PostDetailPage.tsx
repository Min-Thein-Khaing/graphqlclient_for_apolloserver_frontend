import React from 'react'
import { Link, useParams } from 'react-router'
import { gql } from '../__generate__'
import { useQuery } from '@apollo/client/react'

const GET_POST_DETAIL = gql(`
    query Post($id: ID!) {
  post(id: $id) {
    title
    published
    id
    content
    author {
    id
      name
      email
    }
  }
}
  `)

const PostDetailPage = () => {
    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_POST_DETAIL, {
        variables: { id: id || "" }
    })
    if (!data?.post) {
        return <p>Post not found</p>
    }
    return (
        <div>
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            
            {data?.post && (
                <div>
                    <Link to="/">Back</Link>
                    <div className="post-footer">
                        <div className="footer-left">
                            <div className="author-avatar">
                                {data.post.author?.name?.charAt(0) || '?'}
                            </div>
                            <div className="author-info">
                                <div className="author-name">
                                    {data.post.author?.name}
                                </div>
                                <div className="author-email">
                                    {data.post.author?.email}
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className='text-black'>{data.post.title}</h1>
                    <p className='text-black'>{data.post.content}</p>
                </div>
            )}
        </div>
    )
}

export default PostDetailPage