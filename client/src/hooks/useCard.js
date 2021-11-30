import React, { createContext, useState, useContext } from "react";
import { v4 } from "uuid";
// The terms context and Provider are a little foggy to me here

// setting the global context within a module. doesn't have to be a global context but in this
// case it happens to be

// The color json variable can be raw json returned from a backend API route
const CardContext = createContext();
// I can think of this as a custom useState built from useContext
export const useCard = () => useContext(CardContext);

export function CardProvider ({ children }) {
  const [card, setCard] = useState('');
  const isValidInput = (id) => {
    if (isNaN(parseInt(id))) {
      return false
    } else {
      return true
    } 
  }
    

    const setCardData = (id) => {
      if(isValidInput(id)) return;

      setCard(
        (color => (color.id === id ? {...color, rating} : color))
      );
    }
    return (
      <CardContext.Provider value={{setCardData}}>
        {children}
      </CardContext.Provider>
    )
}