import React, { useState } from "react";

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    };

    addBlog(blogObject);

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2> create new blog post</h2>
      <form onSubmit={onSubmit}>
        <input
          value={newTitle}
          onChange={handleTitleChange}
          placeholder="title"
          id="title-input"
        />
        <input
          value={newAuthor}
          onChange={handleAuthorChange}
          placeholder="author"
          id="author-input"
        />
        <input
          value={newUrl}
          onChange={handleUrlChange}
          placeholder="URL"
          id="url-input"
        />
        <button type="submit" id="create-button">
          create
        </button>
      </form>
    </div>
  );
};

export default BlogForm;
