// https://unpkg.com/pokemons@1.1.0/pokemons.json

import { Pokemon } from "../types/types";
import { formatName } from "../utils/utils";

export async function fetchPokemons(): Promise<Pokemon[]>{
    const response = await fetch("https://unpkg.com/pokemons@1.1.0/pokemons.json") // Nos conectamos a la API
    if(!response.ok){ // Caso de que la respuesta falle
        throw new Error("Error al mostrar los pokemons") 
    }
    const results = await response.json() // Transformamos los resultados en .json

    const pokemons = results.results.map((pokemon: any) => ({
        name: pokemon.name,
        id: pokemon.national_number,
        // Usamos backticks para poder modificar dinámicamente el nombre del Pokémon
        // Sin embargo, usamos .gif para siempre traer ese tipo de archivo
        // Importante la funcion "tolowercase", de lo contrario, las imagenes no se mostraran
        imgSrc: `https://img.pokemondb.net/sprites/black-white/anim/normal/${formatName(pokemon.name.toLowerCase())}.gif`,
    }));
    
    const uniquePokemons = pokemons.filter(
        (pokemon: any, index: number)=>
            pokemons.findIndex((other: any) => other.id === pokemon.id) === index
    )

    return uniquePokemons
}