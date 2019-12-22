import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import TitleHeader from '../TitleHeader';
import Card from '../Card';


class BlogList extends Component {

  openDetailedBlog(blog) {
    let blogTitle = blog.title.split(' ').join('');
    let blogPublishedDate = blog.published_date;

    localStorage.setItem('values', JSON.stringify(this.props.values))
    localStorage.setItem('searchValue', JSON.stringify(this.props.searchValue))
    
    this.props.history.push({
      pathname:`/details/${blogTitle}/${blogPublishedDate}`,
      state: {index: blog.id}
    });
  }
 
  renderBlogsList() {
    
    let { blogArrayList } = this.props;

    const newblogArrayList = blogArrayList.map((blog, index) => {
      let blogPublishedDate = new Date(blog.published_date).toDateString()
      
      return (
        <Card key={`${blog.published_date}-${blog.id}`} blogPublishedDate={blogPublishedDate} blog={blog} openDetailedBlog={(blog, index)=>{this.openDetailedBlog(blog)}} />
      )
    })

    return newblogArrayList;
  }
  
  render(){
   return(
    <div className='blog-wrap'>
      { (this.props.view !=='main') && <TitleHeader title={this.props.viewTitle} element={'h2'}/>}
      <div className="blog-list">
        {this.renderBlogsList()}
      </div>
    </div>
   )
 }
}

export default withRouter(BlogList);