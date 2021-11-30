import React from "react";
import Fetch from "../../Fetch";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';


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



function CharacterCard({data}) {
  const characterDetails = data
  console.log("what's this look like: " +characterDetails.name) 
  const card = (
    <>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          
        </Typography>
        <Typography variant="h5" component="div">
          {characterDetails.name}
        </Typography>
        <Typography sx={{ mb: .5 }} color="text.secondary">
        Height: {characterDetails.height}
        </Typography>
        <Typography sx={{ mb: .5 }} color="text.secondary">
        Weight: {characterDetails.mass}kg
        </Typography>
        <Typography sx={{ mb: .5 }} color="text.secondary">
        Hair Colour: {characterDetails.hair_color}
        </Typography>
        <Typography sx={{ mb: .5 }} color="text.secondary">
        Skin Colour: {characterDetails.skin_color}
        </Typography>
        <Typography sx={{ mb: .5 }} color="text.secondary">
        Gender: {characterDetails.gender}
        </Typography>
        <Typography sx={{ mb: .5 }} color="text.secondary">
        YOB: {characterDetails.birth_year}
        </Typography>



        <Typography variant="body2">
          <br />
          {characterDetails.age}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
      </>
  );

return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );

/*   const character = characterData;
  console.log("char data " + characterData);
  return <div>{JSON.stringify(character)}</div>; */
}

export default Character;
