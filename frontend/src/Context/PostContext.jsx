import React, { createContext, useState } from 'react';

export const PostContext = createContext();

function PostContextProvider(props) {
  const [responseData, setResponseData] = useState('');
  const [commentsData, setCommentsData] = useState('');

  return (
    <PostContext.Provider
      value={{ setResponseData, responseData, setCommentsData, commentsData }}
    >
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;
