import React from 'react';


const Card = (props)=>{
    let {blog, blogPublishedDate, openDetailedBlog}= props;
        return (
            <div className='card' onClick={()=>{openDetailedBlog(blog)}}>
                <div className='blog-data-wrap'>
                    <div className="blog-list-head">
                        <span>{blogPublishedDate} -  <b className="category">{blog.category}</b> </span>
                        <div className='like-wrap'>
                            <i></i>
                            <span>{blog.likes} Likes</span>
                        </div>
                    </div>
                    <h2>{blog.title}</h2>
                    <p>{blog["short-description"]}</p>
                    <b>By: <i>{blog.author}</i></b>
                </div>
                <img srcSet={` https://cdn2.iconfinder.com/data/icons/iconslandtransport/PNG/256x256/CarGrey.png 978w, 
                https://cdn2.iconfinder.com/data/icons/iconslandtransport/PNG/128x128/CarGrey.png 320w `}
                 src={`${blog.imgs.thumb}`} alt={blog.title}/>
            </div>
        )
}

export default Card;

