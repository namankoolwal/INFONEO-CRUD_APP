import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from '../redux/postsSlice';

export default function PostForm({ post, onClose }) {
  const [title, setTitle] = useState(post ? post.title : '');
  const [body, setBody] = useState(post ? post.body : '');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      dispatch(updatePost({ id: post.id, title, body }));
    } else {
      dispatch(addPost({ title, body }));
    }
    setTitle('');
    setBody('');
    if (onClose) onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="post-form">
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
          required
        />
      </div>
      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Post content"
          required
        />
      </div>
      <button type="submit">{post ? 'Update Post' : 'Add Post'}</button>
    </form>
  );
}