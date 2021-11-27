const { response } = require("express");
var express = require("express")
var fetch = require("node-fetch")
var router = express.Router()

router.get("/:characterId", async function(req, res, next){
    const characterId = req.params.characterId;
    const url = `https://swapi.dev/api/people/${characterId}/?format=json` 

    const characterData = await fetch(url)
    .then(function(response) {
        console.log((response))
        let data = response.json()
        console.log((data))
        return data
    }).catch(function (error) {
		// if there's an error, log it
		console.log(error);
	});

    const filmsDetails = characterData.films.length <= 0 ? null : await Promise.resolve(getMoviesData((characterData.films)))
    const planetDetails = characterData.planet ? null : await Promise.resolve(getPlanetData(characterData.homeworld))
    console.log("speicies detail: "+characterData.species + typeof characterData.species + " " + characterData.species.length)
    const speciesDetails = characterData.species.length <= 0 ? null : await Promise.resolve(getSpeciesData(characterData.species))

    const characterDataResponse =  
        {   name: characterData.name, 
            height: characterData.height,
            mass: characterData.mass,
            hair_color: characterData.hair_color,
            skin_color: characterData.skin_color,
            gender: characterData.gender,
            birth_year: characterData.birth_year,
            films_data: filmsDetails,
            home_planet_data: planetDetails,
            species_data: speciesDetails,
        }
        
    //console.log("character data" + JSON.stringify(characterDataResponse))
    res.send(characterDataResponse)
})

module.exports = router;

/**
 * @param {string[]} films an array of film url strings
 * @return {Object[]} {title, director, producers, release_date}
 */
  async function getMoviesData(films) {
    let filmsArray = [];
        console.log(films + "Array?: " + Array.isArray(films))
        await Promise.all(films.map(f=>fetch(f))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(jsonResponses => {
            filmsArray = jsonResponses
        })
        return filmsArray.map((film) => {
                return {title: film.title,  
                        director: film.director,
                        producers: film.producers,
                        release_date: film.release_date,
                        }
                })
}

/**
 * @param {string} planetUrl a url string
 * @return {Object[]} {name, terrain, population}
 */
async function getPlanetData(planetUrl) {
    let planetData = await Promise.resolve(fetch(`${planetUrl}`)).then(res => res.json())
    return {name: planetData.name, terrain: planetData.terrain, population: planetData.population}
}

/**
 * @param {string} speciesUrl a url string
 * @return {Object[]} {average_lifespan, classification, language}
 */
async function getSpeciesData(speciesUrl) {
    let speciesData = await Promise.resolve(fetch(`${speciesUrl}`)).then(res => res.json())
    return {name: speciesData.name, 
            average_lifespan: speciesData.average_lifespan, 
            classification: speciesData.classification, 
            language: speciesData.language 
            }
}
