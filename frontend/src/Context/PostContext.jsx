import React, { createContext, useState } from 'react';

export const PostContext = createContext();

export default function PostContextProvider(props) {
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
