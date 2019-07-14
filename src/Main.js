import React from '../node_modules/react'
import SearchPage from './SearchPage/SearchPage'
import  HomePage  from './HomePage/HomePage'
import LoginPage from './LoginPage/LoginPage'
import  RegisterPage  from './RegisterPage/RegisterPage'
import { Switch, Route } from '../node_modules/react-router-dom'
import MoviesList from './MoviesList/MoviesList';
import MoviePage from './MoviePage/MoviePage';
import UserPage from './UserPage/UserPage';

export const Main = () => (
      <Switch>
        <Route exact path='/' component={ HomePage }/>
        <Route exact path='/search' component={ SearchPage }/>
        <Route exact path='/login' component={ LoginPage }/>
        <Route exact path='/register' component={ RegisterPage }/>
        <Route exact path='/movies' component={ MoviesList }/>
        <Route exact path='/moviepage' component={ MoviePage }/>
        <Route exact path='/userpage' component={ UserPage }/>
      </Switch>
)