import React from "react";
import Fetch from "../../Fetch";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} followCursor />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    color: "rgba(0, 0, 0, 0.87)",
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(12),
    border: "1px solid #dadde9",
  },
}));

const CharacterCard = ({ characterId }) => {
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

function CharacterTemplate(characterData) {
  const characterDetails = characterData.data;
  const { filmsDetails, speciesDetails, planetDetails } = characterDetails;
  console.log("what's this look like: " + JSON.stringify(filmsDetails));
  const card = (
    <>
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color="text.secondary"
          gutterBottom
        ></Typography>
        <Typography variant="h5" component="div">
          {characterDetails.name}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          Height: {characterDetails.height}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          Weight: {characterDetails.mass}kg
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          Hair Colour: {characterDetails.hair_color}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          Skin Colour: {characterDetails.skin_color}
        </Typography>
        <Typography sx={{ mb: 0.5 }} color="text.secondary">
          Gender: {characterDetails.gender}
        </Typography>
        <Typography color="text.secondary">
          YOB: {characterDetails.birth_year}
        </Typography>

        <Typography variant="body2">
          <br />
          {characterDetails.age}
        </Typography>
      </CardContent>
      <h3>Hover over the stuff below to get more info...</h3>
      <Divider />
      <CardActions>
        {!characterDetails ? null : (
          <HtmlTooltip
            title={
              <>
                <Typography variant="h5" color="inherit">
                  Movie Details
                </Typography>
                {"Here are the movies"} <b>{characterDetails.name}</b>{" "}
                {"has appeared in,"}
                {filmsDetails.map((film) => (
                  <>
                    <h3 key={film.title}>{film.title}</h3>

                    <Typography sx={{ mb: 0.5 }} color="text.secondary">
                      Director: {film.director}
                    </Typography>
                    <Typography sx={{ mb: 0.5 }} color="text.secondary">
                      Release Date: {film.release_date}
                    </Typography>
                  </>
                ))}
              </>
            }
          >
            <Button>Films</Button>
          </HtmlTooltip>
        )}
        {!planetDetails ? null : (
          <HtmlTooltip
            title={
              <>
                <Typography variant="h5" color="inherit">
                  {planetDetails.name}
                </Typography>
                {"Home planet"} of <b>{characterDetails.name}</b>{" "}
                <>
                  <Typography sx={{ mb: 0.5, mt: 1 }} color="text.secondary">
                    Population: {planetDetails.population}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Terrain: {planetDetails.terrain}
                  </Typography>
                </>
              </>
            }
          >
            <Button>Homeworld</Button>
          </HtmlTooltip>
        )}
        {!speciesDetails ? null : (
          <HtmlTooltip
            title={
              <>
                <Typography variant="h5" color="inherit">
                  {speciesDetails.name}
                </Typography>
                {"The race of which"} <b>{characterDetails.name}</b>
                {" is a member"}
                <>
                  <Typography sx={{ mb: 0.5, mt: 1 }} color="text.secondary">
                    Avg. Lifespan: {speciesDetails.average_lifespan}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Classification: {speciesDetails.classification}
                  </Typography>
                  <Typography sx={{ mb: 0.5 }} color="text.secondary">
                    Language: {speciesDetails.language}
                  </Typography>
                </>
              </>
            }
          >
            <Button>Species</Button>
          </HtmlTooltip>
        )}
      </CardActions>
    </>
  );

  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined" raised={3}>
        {CharacterTemplate}
      </Card>
    </Box>
  );
}

export default CharacterCard;