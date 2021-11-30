import React from 'react';
import { useCardId } from '../../hooks/useCard';

const SearchBar = ({searchTerm,setSearchTerm}) => {
  const {setCardData} = useCardId()
  const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem"};
  return (
    <input 
     style={BarStyling}
     value={searchTerm}
     placeholder={"Search character by ID"}
     onChange={(e) => setCardData(e.target.value)}
    />
  );
}

export default SearchBar