import React, { useState, useEffect } from "react";
import axios from "axios";

const Display = () => {
  const [pokemon, setPokemon] = useState({});
  const [locations, setLocation] = useState();

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/charmander")
      .then((res) => {
        console.log(pokemon);
        setPokemon({
          pokemons: res.data,
          isClicked: false,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon/4/encounters")
      .then((res) => {
        setLocation(res.data);
      }, [])
      .catch((err) => console.log(err));
  });


  const clickHandler = () => {
    setPokemon({
      ...pokemon,
      isClicked: !pokemon.isClicked,
    });
    console.log(pokemon);
  };

  return (
    <div>
      <button className="btn btn-warning m-5" onClick={clickHandler}>
        Fetch Pokemon
      </button>
      {pokemon.isClicked && pokemon.pokemons !== undefined && (
        <>
          <h2> {pokemon.pokemons.name} </h2>
          <div>
            <img
              src={pokemon.pokemons.sprites.back_default}
              alt="back default sprite image"
            />
            <img
              src={pokemon.pokemons.sprites.back_shiny}
              alt="back shiny sprite image"
            />
            <img
              src={pokemon.pokemons.sprites.front_default}
              alt="front default sprite image"
            />
            <img
              src={pokemon.pokemons.sprites.front_shiny}
              alt="front shiny sprite image"
            />
          </div>
          {locations.map((location, i) => {
            return (
              <>
                <div style={{ display: "inline-block" }} key={i}>
                  Name: {location.location_area.name}
                </div>
                &nbsp;&nbsp;|&nbsp;
                <div style={{ display: "inline-block" }} key={i + 1}>
                  URL: <a href={location.location_area.url}>{location.location_area.url}</a>
                </div>
                <br />
              </>
            );
          })}
        </>
      )}

    </div>
  );
};

export default Display;
