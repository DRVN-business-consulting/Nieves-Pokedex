import { useEffect, useState, useContex} from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useFavorite } from '../context/favoriteContext.js';
import { ThemeContext,themes } from '../context/themes.js';

import React
 from 'react';
export default function allPokemons() {
  const [pokemonList, setPokemonList] = useState([]);
  const router = useRouter(); 
  const { favorite, setFavorite } = useFavorite();
  const { theme } = React.useContext(ThemeContext);
  const themeStyles = themes[theme];

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokemon-api-nssw.onrender.com/pokemon');
        const data = await response.json();
        setPokemonList(data); 
      } catch (error) {
        console.error(error);
      }
    };

    fetchPokemon();
  }, []);

  const handleFavorite = (pokemon) => {
    setFavorite((prevFavorites) => {
      if (prevFavorites[pokemon.id]) {
        const updatedFavorites = { ...prevFavorites };
        delete updatedFavorites[pokemon.id]; 
        return updatedFavorites;
      } else {
        return {
          ...prevFavorites,
          [pokemon.id]: pokemon, 
        };
      }
    });
  };
  
  const handleDetails = (id) => {
    if (id) {
        router.push({
          pathname: '/details',
          params: { id },
        });
      } else {
        console.error('ID is undefined or null');
      }
  };
  return (
   
    <View style={[styles.container, themeStyles.background]}>
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleDetails(item.id)}>
          <View style={styles.pokemonItem} >
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <Image 
              source={{ uri: item.image.hires }} 
              style={styles.pokemonImage}
            />
            <Text style={[styles.pokemonName, themeStyles.text]}>{item.name.english}</Text>
            
             </View>
             <TouchableOpacity onPress={() => handleFavorite(item)}>
              <Image
                source={favorite[item.id] 
                  ? require('../../assets/star-filled.png') // Filled star if favorite
                  : theme === 'dark'
                    ? require('../../assets/star-unfilled-white.png') // White unfilled star in dark mode
                    : require('../../assets/star-unfilled.png') // Black/regular unfilled star in light mode
                }
                style={{height: 30, width: 30}}
              />
            </TouchableOpacity>
          </View>
          </TouchableOpacity>
        )}>
        
        </FlatList>    
    </View>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  pokemonItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  pokemonImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  pokemonName: {
    fontWeight: 'bold',
    fontSize: 20
  },
});