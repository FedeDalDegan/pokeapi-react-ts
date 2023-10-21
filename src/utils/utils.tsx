// Hay problemas con ciertos pokemons (por ciertos caracteres que tienen en sus nombres)
// Por lo tanto, se crean estas funciones para que no molesten
export function formatName(name: string): string {
    if (name.includes("♀")) { // Caso nidoran hembra
      return name.replace("♀", "-f");
    } else if (name.includes("♂")) { // Caso nidoran macho
      return name.replace("♂", "-m");
    } else if (name.includes(". ")) { // Caso Mr. Mine
      return name.replace(". ", "-");
    } else if (name.includes("farfetch'd")) { // Caso Farfetchd
      return name.replace("farfetch'd", "farfetchd");
    } else {
      return name;
    }
}

// Funcion settimeout para loadingscreen
export function waitFor(time: number): Promise<void>{
  return new Promise((resolve)=>setTimeout(resolve,time))
}