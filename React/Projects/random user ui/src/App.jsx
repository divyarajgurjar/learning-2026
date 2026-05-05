import { useState, useEffect } from 'react';

import Card from './components/card.jsx';
import './styles/App.css'
import Navbar from './components/navbar.jsx';

const url = 'https://api.freeapi.app/api/v1/public/randomusers/user/random';
const options = {method: 'GET', headers: {accept: 'application/json'}};
const users = []

function App(){
  const [userInfo, setUserInfo] = useState(null)
  const [loading, setLoading] = useState(false)

  async function getUser(){
    try {
  setLoading(true)
  const response = await fetch(url, options);
  const data = await response.json();
  setUserInfo(data.data)
} catch (error) {
  console.error(error);
}finally{
  setLoading(false)
}
}
  useEffect(() =>{
getUser()
},[])
  return (
    <>
    <Navbar/>
    <div id='app'>
      <div id="app-body">
        {userInfo && <Card info={userInfo} loading = {loading} getUser= {getUser}/>}
      </div>
    </div>
    </>
  )
}

export default App

/*
1. Center mein ek card hoga, jismein basic or more info feature rahega.
2. Below that next or prev card bhi rahega. Jo array ke andar store karenge info ko.

3. All User karke ek button rahega. Top Right corner par.

*/

/*
The Rule: If you want to see it on the screen, put it in State.
The Rule: You can't assign the result of an API call to a regular variable in React. You have to fetch it, then "set" it into state once it arrives.
The Rule: If your JSX (the stuff in the return) needs to use a piece of data, that data must be defined at the top level of your component function.
*/