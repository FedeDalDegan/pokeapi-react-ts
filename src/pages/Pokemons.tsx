import React, { useEffect, useState } from "react"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { Link } from "react-router-dom"
import styles from "./pokemon.module.css"

// Assets
import BulbasaurPic from "../assets/bulbasaur.gif"
import { fetchPokemons } from "../api/fetchPokemons"
import { Pokemon } from "../types/types"
import LoadingScreen from "../components/LoadingScreen"
import {waitFor} from "../utils/utils"

const Pokemons = () => {

  const [query, setQuery] = useState("")
  const [pokemons, setPokemons] = useState<Pokemon[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=>{
    const fetchAllPokemons = async () => {
      setIsLoading(true)
      await waitFor(500) // Hacer ASINCRONO el loading screen
      const allPokemons = await fetchPokemons()
      setPokemons(allPokemons)
      setIsLoading(false)
    }
    fetchAllPokemons();
  },[])

  if(isLoading || !pokemons){
    return <LoadingScreen />
  }

  // Funcion para que el input filtre los pokemones buscados
  // pokemons? Significa "Si esta disponible, entonces..."
  const filteredPokemons = pokemons.slice(0, 151).filter((pokemon) => {
    // Devolvera los nombres de los pokemons (en minuscula) y matcheara la busqueda / peticion
    return pokemon.name.toLowerCase().match(query.toLowerCase())
  })

  return (
    <>
    <Header query={query} setQuery={setQuery}/>
    <main>
      <nav className={styles.nav}>
        {filteredPokemons?.slice(0, 151).map((pokemon)=>(
          <Link key={pokemon.id} to={`/pokemon/${pokemon.name.toLowerCase()}`} className={styles.listItem}>
            <img src={pokemon.imgSrc} alt={pokemon.name} className={styles.listItemIcon}/>
            <div className={styles.listItemText}>
              <span>{pokemon.name}</span>
              <span>{pokemon.id}</span>
            </div>
          </Link>
        ))}
      </nav>
    </main>
    <Footer />
    </>
  )
}

export default Pokemons

