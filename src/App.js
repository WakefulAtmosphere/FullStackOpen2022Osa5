import React, { useState, useEffect } from 'react';
import BlogList from './components/BlogList';
import LoginForm from './components/LoginForm';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';

const App = () => {
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [notification, setNotification] = useState('');

  const updateBlogs = async () => {
    const newBlogs = await blogService.getAll();
    setBlogs(newBlogs);
  };

  useEffect(() => {
    updateBlogs();
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON);
      setUser(loggedUser);
      blogService.setToken(loggedUser.token);
    }
  }, []);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const loggedUser = await loginService.login({
        username, password,
      });
      setUser(loggedUser);
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setNotification('wrong credentials');
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  };

  const handleLogout = () => {
    setUser(null);
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      window.localStorage.removeItem('loggedUser');
    }
    blogService.setToken(null);
  };
  const addLike = async (blog) => {
    await blogService.like(blog);
  };
  const submitBlog = async (blog) => {
    try {
      const response = await blogService.submitBlog(blog);
      const newBlogs = await blogService.getAll();
      setBlogs(newBlogs);
      setNotification(`${response.data.title} by ${response.data.author} successfully added`);
      setTimeout(() => {
        setNotification('');
      }, 5000);
    } catch (exception) {
      setNotification('adding blog failed');
      setTimeout(() => {
        setNotification('');
      }, 5000);
    }
  };
  const deleteBlog = async (blog) => {
    await blogService.deleteBlog(blog);
    const newBlogs = await blogService.getAll();
    setBlogs(newBlogs);
  };
  return (
    <div>
      <Notification contents={notification} />
      {
        user === null
          ? (
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              handleLogin={handleLogin}
            />
          )
          : (
            <BlogList
              blogs={blogs}
              user={user}
              handleLogout={handleLogout}
              submitBlog={submitBlog}
              addLike={addLike}
              deleteBlog={deleteBlog}
            />
          )
      }
    </div>
  );
};

export default App;
