import React from 'react';

const SearchFilter = (props)=><input type="text"  value={props.searchValue} onChange={(e)=>{props.getfilteredList(e.target.value)}}/>

export default SearchFilter;