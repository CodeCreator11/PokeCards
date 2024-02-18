import React from 'react';
import { useEffect, useState } from 'react';
import scss from './layout.module.scss'
import Nav from '../Nav/Nav'
import axios from 'axios'
import * as FaIcons from "react-icons/fa"
import { URL_POKEMON } from '../../../src/Api/apiRest'
import Card from '../Card/Card';



const Layout = () => {

const [arrayPokemon, setArrayPokemon] = useState([])
const [globalPokemon, setGlobalPokemon] = useState([])
const [xpage, setXpage] = useState(1)
const [search, setSearch] = useState([])

  useEffect(() => {
const api = async () => {

  const limit = 15
  const xp= (xpage - 1) * limit
  const apiPoke = await axios.get(`${URL_POKEMON}/?offset=${xp}&limit=${limit}`);

  setArrayPokemon(apiPoke.data.results);
};
api();
getAllPokemons();
  }, [xpage]);

  const getAllPokemons = async () => {
    const res = await axios.get(`${URL_POKEMON}?offset=0&limit=1000`);
    const promises = res.data.results.map((pokemon) =>{
      return pokemon;
  });

    const results = await Promise.all(promises)
    setGlobalPokemon(results);
  };

  const filterPokemon = search.length > 0 
  ?globalPokemon.filter(pokemon => pokemon.name.includes(search))
  : arrayPokemon

  const getSearch = (e) =>{
    const text = e.toLowerCase()
    setSearch(text)
    setXpage(1)
  };

  return (
    <div>
      <Nav getSearch = {getSearch}/>

    <section className={scss.section_pag}>
      <div className={scss.div_pag}>

        <span className={scss.left_item}
        onClick={() =>{
          if (xpage === 1){
            return alert("This is the first page!!");
          }
          setXpage(xpage-1)
        }}> <FaIcons.FaAngleLeft /> </span>

        <span className={scss.item}> {xpage} </span>
        <span className={scss.item}> OF </span>
        <span className={scss.item}> {Math.round(globalPokemon.length / 15)} </span>

        <span className={scss.right_item}
        onClick={() =>{
          if (xpage === 67){
            return alert("This is the last page!!");
          }
          setXpage(xpage+1)
        }} >  <FaIcons.FaAngleRight /> </span>
      </div>
    </section>

      <div className={scss.card_content}>
      {filterPokemon.map((card,i) => {
        return <Card key={i} card={card}/>; 
      })
      }
      </div>
    </div>
  )
}

export default Layout
