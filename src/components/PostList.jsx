import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, deletePost } from '../redux/postsSlice';
import PostForm from './PostForm';

export default function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Posts</h2>
      <PostForm />
      <div className='Postlists'>

      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <button onClick={() => setEditingPost(post)}>Edit</button>
          <button onClick={() => dispatch(deletePost(post.id))}>Delete</button>
          
          {editingPost?.id === post.id && (
            <div className="edit-form">
              <PostForm 
                post={editingPost} 
                onClose={() => setEditingPost(null)} 
              />
            </div>
          )}
        </div>
      ))}
      </div>

    </div>
  );
}