import React from 'react';

const SearchBar = ({searchTerm,setSearchTerm}) => {
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     value={searchTerm}
     placeholder={"Search character by ID"}
     onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

export default SearchBar