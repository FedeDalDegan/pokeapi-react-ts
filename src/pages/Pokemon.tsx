import { useNavigate, useParams } from "react-router-dom"
import styles from "./pokemons.module.css"

// Assets
import PokeballImg from "../assets/pokeball.png"
import Footer from "../components/Footer"
import { useEffect, useState } from "react"
import { PokemonDetails } from "../types/types"
import { fetchPokemon } from "../api/fetchPokemon"

const Pokemon = () => {

  // Siempre es importante desestructurar el useParams()
    const {name} = useParams()
    const navigate = useNavigate()
    const [pokemon, setPokemon] = useState<PokemonDetails>()

    useEffect(()=>{
      async function getPokemon(){
        const fetchedPokemon = await fetchPokemon(name as string)
        setPokemon(fetchedPokemon)
      }
      getPokemon()
    },[name]) // El renderizado cambiara si "name" cambia

  return (
    <>
    {/* Navigate-1 nos llevara a la pantalla anterior */}
      <button className={styles.pokeballButton} onClick={()=>navigate(-1)}>
        <img src={PokeballImg} alt="Pokeball" className={styles.pokeballImg}/> Go Back
      </button>
      <div className={styles.pokemon}>
        <main className={styles.pokemonInfo}>
          <div className={styles.pokemonTitle}> {name?.toUpperCase()} </div> 
          <div>Nº {pokemon?.id}</div>
          <div><img src={pokemon?.imgSrc} alt="" className={styles.pokemonInfoImg}/></div>
          <div>HP: {pokemon?.hp}</div>
          <div>ATK: {pokemon?.attack}</div>
          <div>DEF: {pokemon?.defense}</div>
        </main>
      </div>
      <Footer />
    </>
  )
}

export default Pokemon
