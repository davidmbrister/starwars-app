import React from 'react'
import Fetch from '../../Fetch'
import { useCard } from '../../hooks/useCard'

const Character = ({characterId}) => {
  {cardData} = useCard()
  return (
    <div>
      <Fetch 
          uri={`http://localhost:9000/starWarsAPI/${characterId}`} 
          renderSuccess={CharacterCard} />
    </div>
  )
}

function CharacterCard (characterData) {
  const character =  characterData
  console.log("char data " + characterData)
  return (
    <div>
      {JSON.stringify(character)}
    </div>
  )
}

export default Character