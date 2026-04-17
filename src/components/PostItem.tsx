import React from 'react'

import type { Post } from '../__generate__/types'
import { Link } from 'react-router';
import { gql } from '../__generate__';
import { useMutation } from '@apollo/client/react';
import { POSTS } from '../App';

interface PostItemProps {
    post: Post;
}
const DELETE_POST = gql(`
mutation DeletePost($deletePostId: ID!) {
  deletePost(id: $deletePostId) {
    code
    success
    message
  }
 
}
    `)

const PostItem: React.FC<PostItemProps> = ({ post }) => {
    const [deletePost] = useMutation(DELETE_POST)
    const handleDelete = async () => {
        await deletePost({
            variables: {
                deletePostId: post.id
            },
            refetchQueries: [{
                query: POSTS,
            }]
        })
    }
    return (
        <article className="post-card">
            <div className="post-content">
                <div className="post-header-meta">
                    <span className="badge">{post.published ? 'Published' : 'Draft'}</span>
                    <div className="action-buttons">
                        <Link to={`/post/update/${post.id}`} className="btn-icon edit" title="Edit Post">
                            ✏️
                        </Link>
                        <button onClick={handleDelete} className="btn-icon delete" title="Delete Post">
                            🗑️
                        </button>
                    </div>
                </div>
                <h2 className="post-title">{post.title}</h2>
                <p className="post-excerpt">{post.content}</p>
            </div>

            <div className="post-footer">
                <div className="footer-left">
                    <div className="author-avatar">
                        {post.author?.name?.charAt(0) || '?'}
                    </div>
                    <div className="author-info">
                        <span className="author-name">{post.author?.name || 'Unknown Author'}</span>
                        <span className="author-email">{post.author?.email}</span>
                    </div>
                </div>
                <Link
                    to={`/post/${post.id}`}
                    className="btn-detail"
                >
                    Details
                </Link>
            </div>
        </article>
    )
}

export default PostItem