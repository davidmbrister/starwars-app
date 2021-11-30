import React from "react";
import Fetch from "../../Fetch";

const Character = ({ characterId }) => {
  return (
    <div>
      {!characterId ? null : (
        <Fetch
          uri={`http://localhost:9000/starWarsAPI/${characterId}`}
          renderSuccess={CharacterCard}
        />
      )}
    </div>
  );
};

function CharacterCard(characterData) {
  const character = characterData;
  console.log("char data " + characterData);
  return <div>{JSON.stringify(character)}</div>;
}

export default Character;
