import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import BlogList from '../common/BlogList';

import './index.css';

class BlogDetailsView extends Component {

  state={
    currentBlog:{},
    likedBlog:false
  }

  likeBlog(currentBlog){
    let {blogList} = this.state;
    let  index = blogList.findIndex((blog)=>currentBlog.id === blog.id);
    
    if(!this.state.likedBlog && (typeof(index) === "number")){
      blogList[index] = {...blogList[index], ...{likes:(blogList[index].likes + 1)}}; 
      localStorage.setItem('blogArrayList',JSON.stringify(blogList))
      
      this.setState({
        currentBlog: blogList[index],
        likedBlog: true
      })
    }
  }
  updateCurrentBlog(){
    if(localStorage.getItem('blogArrayList')){
      let {index} = this.props.history.location.state;
      let blogList = JSON.parse(localStorage.getItem('blogArrayList'));
      let currentBlog = blogList.find((blog)=>blog.id === index);

      this.setState({
        currentBlog, 
        blogList,
        likedBlog: false
      })
    }
  }
  componentDidMount(){
    this.updateCurrentBlog();
  }
  componentDidUpdate(prevProps){
    if(this.props.location.state.index !== prevProps.location.state.index){
      this.updateCurrentBlog();
    }
  }
  renderBlog() {
    let {currentBlog} = this.state;

    return (
        <>
          <img src={`${currentBlog.imgs.large}`} alt={currentBlog.title}/>
          <div className="blog-details-seg">
            <h1>{currentBlog.title}</h1>
            <div className="author-seg">
              <img width="auto" height="auto" src="https://cdn0.iconfinder.com/data/icons/app-user-interface-5/48/user-24.png" alt={`avatar-${currentBlog.author}`} />
              <span>By: <i>{currentBlog.author}</i></span>
            </div>
            <hr/>
            <h2>About {currentBlog.title}</h2>
            <p>{currentBlog.description}</p>
            <div className="blog-likes-seg like-wrap">
              <i></i>
              <span>{currentBlog.likes} Likes</span>
              <button onClick={()=>{this.likeBlog(currentBlog)}}>Like</button>
            </div>
          </div>
          <div className="ads-wrap">

          </div>
        </>
    )
  }
  renderSimilarBlogs(){
    let {blogList, currentBlog} = this.state;
    let similarBlogList = blogList.filter((blog)=>blog.category === currentBlog.category && blog.id !==currentBlog.id)

    return (
      <BlogList listType='similar' blogArrayList={similarBlogList} viewTitle="Similar Blogs"/>
    )
  }
  render() {
    const {currentBlog} = this.state;
    return (
      <>
      {Object.keys(currentBlog).length && <div className='blog-details-wrap'>
          {this.renderBlog()}
          <div className="similar-blogs-list">
              {this.renderSimilarBlogs()}
          </div>
        </div>
      }
      </>
    )
  }
}

export default withRouter(BlogDetailsView);