import React, { createContext, useState } from 'react';

export const PostContext = createContext();

function PostContextProvider(props) {
  const [responseData, setResponseData] = useState('');

  return (
    <PostContext.Provider value={{ setResponseData, responseData }}>
      {props.children}
    </PostContext.Provider>
  );
}

export default PostContextProvider;