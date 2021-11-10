
import './App.css';
import {Header} from './components/Header';
import RestaurantBlock from './components/RestaurantBlock';
import SearchBar from './components/Searchbar';
import RBdata from './components/RBdata';
import { Grid } from '@mui/material';
import React from 'react';

 function App() {
   const restaurantComponents = RBdata.map(item => <RestaurantBlock key={item.id} {...item}/>)
   return (
     <div>
       <Header />
       <SearchBar />
       <Grid container spacing={2}>{restaurantComponents}</Grid>
     </div>
  
   )
 }

 export default App;


//axios call to the server --> all restaurants --> map all different divs that contain props
