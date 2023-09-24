import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react'
//Using the Houses API, or any open API of your choice you can find online, 
//create a single page that allows for all 4 CRUD operations to be performed on a resource from the API.
//Create a React component (or more, if needed) to represent the resource.
//Make all forms and other necessary UI pieces their own components as reasonable.

function App() {
  const API_URL = 'https://64f168df0e1e60602d23c0eb.mockapi.io/votes'
  const [votes,setVotes] = useState([{}]);
  const [newName,setNewName] = useState ('')
  const [newPicture,setNewPicture] = useState ('')
  const [newAge,setNewAge] = useState ('')
  const [updatedName,setUpdatedName] =
  useState ('')
  const [updatedPicture,setUpdatedPicture] = useState ('')
  const [updatedAge,setUpdatedAge] = useState ('')

  function getVotes() {
    fetch(API_URL)
    .then(data=>data.json())
    .then(data=>setVotes(data))
  }

  useEffect(()=>{
    getVotes()
    console.log(votes)
  },[])

  function deleteVotes(id){
    fetch(`${API_URL}/${id}`, {
      method: 'DELETE'
    }
    ) .then(()=>getVotes())
  }

  function postNewVotes(e) {
    e.preventDefault()

    let data = {
      name: newName,
      picture: newPicture,
      age: newAge,
    }

    fetch(API_URL, {
      method: 'POST',
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(data)
    }).then(()=>getVotes())
  }

  function updateVotes(e,votesObject) {
    e.preventDefault()
    
    let updatedVotesObject = {
      ...votesObject,
      name: updatedName,
      picture: updatedPicture,
      age: updatedAge,
    }
    
    fetch(`${API_URL}/${votesObject.id}`,{
      method: 'PUT',
      body: JSON.stringify(updatedVotesObject),
      headers: {"Content-Type":"application/json"}
    }).then(()=>getVotes())
  }



  return (
    <div>
      <form className='post-container'>
        <h3>Post New Pet</h3>
        <label>Name</label>
        <input onChange={(e)=>setNewName(e.target.value)} name="name" type="text"></input> 

        <label>Picture</label>
        <input placeholder='Enter Picture URL' onChange ={(e)=>setNewPicture(e.target.value)} name="picture" type="text"></input>

        <label>Age</label>
        <input onChange ={(e)=>setNewAge(e.target.value)} name="age" type="number"></input>

        <button onClick={(e)=>postNewVotes(e)}>Submit</button>
      </form>

      {votes.map((vote,index)=>(
        <div className='user-container' key={index}>
          <div>
            Name: {vote.name} <br></br>
           <img src={vote.animal} width="150px"/> <br></br>
            Age: {vote.age} <br></br>
            <button onClick ={()=>deleteVotes(vote.id)}>Delete</button>
          </div>

          <form>
            <h3>Update Pet</h3> <br></br>
            <label>Updated Name</label> <br></br>
            <input onChange= {(e)=>setUpdatedName(e.target.value)}></input> <br></br>

            <label>Updated Picture</label>
            <input onChange= {(e)=>setUpdatedPicture(e.target.value)}></input> <br></br>

            <label>Updated Age</label>
            <input onChange= {(e)=> setUpdatedAge(e.target.value)}></input> <br></br>
            <button onClick= {(e)=>updateVotes(e,vote)}>Update</button>
          </form>
          </div>
      ))}
    </div>
  );
}

export default App;
