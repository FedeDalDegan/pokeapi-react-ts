import { PokemonDetails } from "../types/types";
import { formatName } from "../utils/utils";

export async function fetchPokemon(name:string): Promise<PokemonDetails>{
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${formatName(name)}`)
    
    if(!response.ok){ // Caso de que la respuesta falle
        throw new Error(`Error al mostrar ${name}`) 
    }

    const result = await response.json()
    // Le decimos como queremos que sea el pokemon
    const pokemon = {
        name: result.name,
        id: result.id,
        imgSrc: result.sprites.front_default,
        hp: result.stats[0].base_stat,
        attack: result.stats[1].base_stat,
        defense: result.stats[2].base_stat,
    }
    // Retorna el pokemon creado
    return pokemon
}