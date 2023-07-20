import React from 'react'


function Post() {
  return (
    <div className='post'>
        <div className='image'>
          <img src='https://yt3.ggpht.com/a-/AAuE7mDBPv4qt4YUIG2cwFAQj6evLc64flE9GQy89g=s900-mo-c-c0xffffffff-rj-k-no'/>
        </div>       
        <div className='texts'>
          <h2> Article Title</h2>
          <p className='info'>           
            <a className='author'> Author  </a>
            <time>yyyy-dd-mm</time>
          </p>
          <p className='summary'>
              #tags #here
          </p>          
        </div>        
      </div>
  )
}

export default Post;
