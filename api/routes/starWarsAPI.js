const { response } = require("express");
var express = require("express")
var fetch = require("node-fetch")
var router = express.Router()
// var books = require('../books') 

router.get("/:characterId", async function(req, res, next){
    let characterDataResponse = {};
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

    console.log("this should be an array: "+characterData.films+" "+Array.isArray(characterData.films))
    const filmsPromises = await Promise.resolve(getMoviesData((characterData.films)))
    //const filmsObject = Object.values(filmsPromises)

    console.log("after return from getMovies: " + (filmsPromises))
   
    //console.log("AFTER after return from getMovies: " + filmsObject)
    
    /* const planetDetails = await getPlanetData(characterData.homeworld).then(homeworldData => homeworldData.json()).catch(function (error) {
		console.log(error);
	});
    const speciesDetails = await getSpeciesData(characterData.species).then(speciesData => speciesData.json()).catch(function (error) {
		console.log(error);
	}); */

    Object.assign(characterDataResponse, 
        {   name: characterData.name, 
            height: characterData.height,
            mass: characterData.mass,
            hair_color: characterData.hair_color,
            skin_color: characterData.skin_color,
            gender: characterData.gender,
            birth_year: characterData.birth_year,
            films_data: filmsPromises,
          /*   home_planet_data: planetDetails,
            species_data: speciesDetails, */
        })
        
    console.log("character data" + JSON.stringify(characterDataResponse))
    res.send(characterDataResponse)
})

module.exports = router;

/**
 * @param {string[]} films an array of film url strings
 * @return {Object[]} 
 */
  async function getMoviesData(films) {
    let filmsArray = [];
    console.log("inside get films "+films + " " + typeof films)
        console.log(films + "Array?: " + Array.isArray(films))
        await Promise.all(films.map(f=>fetch(f))).then(responses =>
            Promise.all(responses.map(res => res.json()))
        ).then(texts => {
            filmsArray = texts
        })
        return filmsArray.map((film) => {
                return {title: film.title,  
                        director: film.director,
                        producers: film.producers,
                        release_date: film.release_date,
                        }
                })
        //return filmsData
        /* const filmsPromises = films.forEach( async function (filmUrl) {
            const filmsData = await fetch(filmUrl)
            .then(async function(response) {
                let data = await response.json()
                console.log(("moviesData: "+data))
                let filmObject =  
                    {title: data.title,  
                    director: data.director,
                    producers: data.producers,
                    release_date: data.release_date,
                    }
                    console.log("film object: "+ (JSON.stringify(filmObject)))
                return filmObject
            }).catch(function (error) {
                console.log(error);
            });
            return filmsData
     }) */
/*      console.log("films promises before sending out of function: "+ filmsPromises)
     return filmsPromises */
}

async function getPlanetData(planetId) {

}

async function getSpeciesData(speciesId) {

}



/* 
const contents = await fetch(film).then(async function(response) {
    console.log("am i in promise.all.then?")
    //console.log(response)

    console.log(("moviesData: "+response))
    let data = await response.json()
    console.log(("data: "+JSON.stringify(data)))
    let filmObject =  
        {title: data.title,  
        director: data.director,
        producers: data.producers,
        release_date: data.release_date,
        }
    //console.log(("film obj: "+JSON.stringify(filmObject)))
    filmsData.push(filmObject)
    return filmObject
})    */