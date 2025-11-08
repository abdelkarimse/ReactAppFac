
import{configureStore} from '@reduxjs/toolkit';
import themeReducer from './ThemeReducer';
import  favoriteReducer from './FavortiesReducer';
 const store = configureStore ({
 reducer : {
 theme : themeReducer , 
 favorites : favoriteReducer , 
 } ,
 }) ;

 export default store ;