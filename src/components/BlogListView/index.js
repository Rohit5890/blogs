import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import BlogList from '../common/BlogList';
import SearchFilter from '../common/SearchFilter';
import TitleHeader from '../common/TitleHeader';

import './index.css';


class BlogListView extends Component {

  state = {
    blogArrayList: [],
    fullblogArrayList: [],
    loadedListlength: 0,
    blogArrayListLength: 0,
    searchValue:'',
    values:[],
    published_date: false,
    category:false,
    author:false
  }

  async componentDidMount() {
    let blogsArrInLocalStorage = JSON.parse(localStorage.getItem('blogArrayList'));
    if (!blogsArrInLocalStorage) {
      await fetch('./data/blogs.json').then((res) => {
        return res.json();
      }).then((res) => {
        localStorage.setItem('blogArrayList', JSON.stringify(res));
        this.setState({
          fullblogArrayList: res,
          blogArrayList: res.slice(0, 4),
          loadedListlength: 4,
          blogArrayListLength: res.length
        })
      }).catch(error => {

      });

    } else {
      debugger;
      let values = localStorage.getItem('values') !=="undefined" ? JSON.parse(localStorage.getItem('values')):[];
      let searchValue = localStorage.getItem('searchValue')!=="undefined"  ? localStorage.getItem('searchValue') :'';


      this.setState({
        fullblogArrayList: blogsArrInLocalStorage,
        blogArrayList: blogsArrInLocalStorage.slice(0, 4),
        loadedListlength: 4,
        blogArrayListLength: blogsArrInLocalStorage.length,
        values: values,
        searchValue: searchValue,
        author: values.includes('author') ? true : false,
        category:values.includes('category') ? true : false,
        published_date:values.includes('published_date') ? true : false
      });
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevState.values.length !== this.state.values.length){
      this.getSortedBlogList(this.state.values);
    }

  }

  loadMoreBlogs() {
    let { blogArrayList, loadedListlength, fullblogArrayList } = this.state;

    this.setState({
      blogArrayList: [...blogArrayList, ...fullblogArrayList.slice(loadedListlength, loadedListlength + 4)],
      loadedListlength: loadedListlength + 4
    });
  }
  getfilteredList(searchVal){debugger;
    let {fullblogArrayList} = this.state;

    if(searchVal){
      let filteredList = fullblogArrayList.filter((item)=> item.author.toLowerCase().includes(searchVal) || item.category.toLowerCase().includes(searchVal))
      
      this.setState({
        searchValue: searchVal,
        blogArrayList: filteredList
      })
    } else{
      this.setState({
        searchValue: searchVal,
        blogArrayList: fullblogArrayList.slice(0,4)
      })
    }

  }

  computeSort(property) {
    let sortOrder = 1;
    return function (a,b) {
        let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        
        return result * sortOrder;
    }
  }

  getSortedBlogList(values){
    let {fullblogArrayList}= this.state;
    let newfullblogArrayList = [...fullblogArrayList]; 
    if(values.length){
      let sortedBlogList = newfullblogArrayList.sort((()=>{
        return (obj1, obj2)=>{
          let i = 0, result = 0, numberOfProperties = values.length;
          
          while(result === 0 && i < numberOfProperties) {
            result = this.computeSort(values[i])(obj1, obj2);
            i++;
          }
          return result;
        }
      })(...values));

    
      this.setState({
        blogArrayList: sortedBlogList,
        values
      });
    } else{
      this.setState({
        blogArrayList: fullblogArrayList.slice(0,4)
      });
     }
  }

  toggleCheck(e){
    let elemName = e.target.name;
    let {[elemName]:currChekboxElem, values} = this.state;
    let newValues =[];
    

    if(!currChekboxElem){
      newValues = [...values, ...[elemName]];
    } else{
      newValues = values.filter((value)=> value !== elemName)
    }
    
    this.setState({
      [elemName] : !this.state[elemName],
      values: newValues,
    })
  }

  render() {
    let { blogArrayListLength, loadedListlength, blogArrayList, searchValue, values } = this.state;

    return (
      <>
        <TitleHeader className='title-main' title="Blog" element={'h1'}/>
        <div className='utility-seg'>
          <div className="search-utility">
            <span>Search Blog: </span>
            <SearchFilter 
              searchValue={searchValue} 
              getfilteredList={(searchVal)=>{this.getfilteredList(searchVal)}}
            />
          </div>
          <div className="sort-utility">
            <span>Sort Blog By: </span>
            <label>
              <span>Author</span>
              <input type="checkbox" name='author' checked={this.state.author} onChange={(e)=>{this.toggleCheck(e)}} />
            </label>
            <label>
              <span>Category</span>
              <input type="checkbox" name='category' checked={this.state.category} onChange={(e)=>{this.toggleCheck(e)}} />
            </label>
            <label>
              <span>Published Date</span>
              <input type="checkbox" name='published_date' checked={this.state.published_date} onChange={(e)=>{this.toggleCheck(e)}} />
            </label>
          </div>
        </div>
        {blogArrayListLength && <BlogList searchValue={searchValue} values={values} view='main'  blogArrayList={blogArrayList} />}
        {(!searchValue && !values.length)  && ((loadedListlength !== blogArrayListLength) && <button className="load-more" onClick={() => { this.loadMoreBlogs() }}>Load More Blogs</button>)}
      </>
    )
  }
}

export default withRouter(BlogListView);