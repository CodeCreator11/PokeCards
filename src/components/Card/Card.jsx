import React from 'react'
import { useEffect, useState } from 'react'
import css from '../Card/card.module.scss'
import { URL_EVOLUTIONS, URL_POKEMON, URL_SPECIES } from '../../Api/apiRest'
import axios from 'axios'

const Card = ({card}) => {

    const [itemPokemon, setItemPokemon] = useState([])
    const [speciePokemon, setSpeciePokemon] = useState([])
    const [evolutions, setEvolutions] = useState([])


    useEffect(() => {
        const dataPokemon = async () =>{
            const api = await axios.get(`${URL_POKEMON}/${card.name}`);

            setItemPokemon(api.data);

        }; 

        dataPokemon();

    }, [card]);

    
    useEffect(() => {
      const dataSpecie = async () =>{
        
        const URL = card.url.split("/");
        
        const api = await axios.get(`${URL_SPECIES}/${URL[6]}`);
        setSpeciePokemon({
          url_specie: api?.data?.evolution_chain,
          data: api.data
        });
        
      }; 
      
      dataSpecie();
      
    }, [card]);



    useEffect(() => {

      async function getPokemonImg(id) {
        const response = await axios.get (`${URL_POKEMON}/${id}`);
        return response?.data?.sprites?.other['official-artwork']?.front_default;
      }

      
      if(speciePokemon?.url_specie){
        
        const obtainEvolutions = async () =>{
          
          const arrayEvolutions = [];
          const URL = speciePokemon?.url_specie?.url.split("/");          
          const api = await axios.get(`${URL_EVOLUTIONS}/${URL[6]}`);
          const URL2 = api.data.chain.species.url.split("/"); 
          const img1 = await getPokemonImg(URL2[6]);

          arrayEvolutions.push({
            img: img1,
            name: api?.data?.chain?.species?.name,
          });

          if(api?.data?.chain?.evolves_to?.length !== 0){
            const Data2 = api?.data?.chain?.evolves_to[0]?.species;
            const Id = Data2?.url?.split("/");
            const img2 = await getPokemonImg(Id[6]);

            arrayEvolutions.push({
              img: img2,
              name: Data2.name,
            });

            if(api?.data?.chain?.evolves_to[0].evolves_to.length !== 0){
              const Data3 = api?.data?.chain?.evolves_to[0]?.evolves_to[0].species;
              const Id = Data3?.url?.split("/");
              const img3 = await getPokemonImg(Id[6]);

              arrayEvolutions.push({
                img: img3,
                name: Data3?.name,
              });

            }

          }

          setEvolutions(arrayEvolutions); //

          
        }; 
        
        obtainEvolutions();

      }
        
      }, [speciePokemon]);





    

  return (
    // componente padre
    <div className={css.card}>
    <img className={css.img_poke} src={itemPokemon?.sprites?.other["official-artwork"]?.front_default} alt="pokemon" />
    <div className={`bg-${speciePokemon?.data?.color?.name} ${css.sub_card}`}>
        <strong className={css.id_card}> #{itemPokemon.id}</strong>
        <strong className={css.name_card}>{itemPokemon.name}</strong>
        <h3 className={css.height_poke}>{itemPokemon.height}0 cm </h3>
        <h3 className={css.weight_poke}>{itemPokemon.weight} kg</h3>
        <h3 className={css.habitat_poke}>{speciePokemon?.data?.habitat?.name}</h3>
        <div className={css.div_stats}>
          {itemPokemon?.stats?.map((sta,i)=>{
            return(
              <h5 key={i} className={css.item_stats}>
                <span className={css.stat_name}>{sta.stat.name}</span>
                <progress value={sta.base_stat} max={100}></progress>
                <span className={css.stat_value}>{sta.base_stat}</span>
              </h5>
            );
          })}
        </div>
        <div className={css.div_type_color}>
          {itemPokemon?.types?.map((ti,i)=>{
            return(
              <h5 key={i} className={`color-${ti.type.name} ${css.color_type}`}>{ti.type.name}</h5>
            )
          })}
        </div>
        <div className={css.div_evolutions}>
          {evolutions.map((evo,index) =>{
            return(
              <div key={index} className={css.item_evo}>
                <img src={evo.img} alt = "evo" className={css.img}/>
                <h6> {evo.name} </h6>
              </div>
            );
          })}
        </div>
    </div>
    </div>
  );
}

export default Card
