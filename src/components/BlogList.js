import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';
import BlogForm from './BlogForm';
import Togglable from './Togglable';

const BlogList = ({
  blogs,
  user,
  handleLogout,
  addLike,
  submitBlog,
  deleteBlog,
}) => {
  const [likes, setLikes] = useState(0);
  const sortingFunction = (a, b) => {
    if (a.likes < b.likes) {
      return 1;
    }
    if (a.likes > b.likes) {
      return -1;
    }
    return 0;
  };
  const sendLike = (blog) => {
    addLike(blog);
    setLikes(likes + 1);
  };
  return (
    <div>
      <h2>blogs</h2>
      {`logged in as ${user.username}`}
      <button onClick={handleLogout} type="button">log out</button>
      <Togglable buttonLabel="add new blog">
        <BlogForm submitBlog={submitBlog} />
      </Togglable>
      {blogs.sort(sortingFunction).map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          user={user}
          addLike={sendLike}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.string,
      url: PropTypes.string.isRequired,
      likes: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
      }),
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
  handleLogout: PropTypes.func.isRequired,
  submitBlog: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
};

export default BlogList;
