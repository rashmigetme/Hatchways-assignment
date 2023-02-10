import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import Input  from './Input/index'
import TestScores from './Show';
//using array and all can be opened try npm start again

function App1() {

  const [data, setData] = useState([])
  //console.log(data, typeof data)

  const [input, setInput]= useState("")

  const [clickedCardID, setClickedCardID]= useState([])

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`
    axios
      .get(url)
      .then((response) => {
        setData(response.data.students);
      })
      .catch((error) => {
        console.log("Error in api call: ", error);
      })
  }, [])


 function showGrades(clickedID){
  let newClickedCardID =[...clickedCardID];
     if(newClickedCardID.includes(clickedID)){
      const idClicked  = newClickedCardID.findIndex(i=>i===clickedID)
       newClickedCardID.splice(idClicked,1)
       return setClickedCardID(newClickedCardID)
     }
     newClickedCardID.push(clickedID)
      setClickedCardID(newClickedCardID)
 }
   console.log(clickedCardID, "IDARR")
  function calculateAverage(grades) {
       let sumOfGrades = 0
      for (let key in grades) {
      sumOfGrades += Number(grades[key])
    }
      return sumOfGrades / grades.length
  }

  function renderData() {
    return(
      <div className='main-container'>
        
        {data.filter((i)=>{
          let concat =`${i.firstName.toLowerCase()} ${i.lastName.toLowerCase()}`
          if (concat.includes(input)){
            return true;
          }
          else return false;

        })
        .map(i=>{
         let studentAvg = calculateAverage(i.grades)
         
         
            return <div className='student-data-container' key={i.id}>
               <div > 
                
      <img src={i.pic} width="120px" height="120px" alt=""></img>
      </div>
      <div className='StudentDetails'>
        <div className='nameSection'>
        
      <h1>{i.firstName.toUpperCase()} {i.lastName.toUpperCase()}</h1>
      <button id="showButton" onClick={()=>showGrades(i.id)}><h1>{clickedCardID.includes(i.id)? "-" :"+"}</h1></button></div>
      <p>Email: {i.email}</p>
       <p>Company: {i.company}</p>
     <p>Skill: {i.skill}</p>
     <p>Average: {studentAvg}%</p>
    {clickedCardID.includes(i.id)?< TestScores 
      grades ={i.grades}
      />: null}
      </div>
        </div>
      }
      
   ) }
     
     
      </div>
    )
    }
    return (
    
        <div className='outerContainer'>
          <Input  input= {input}
                setInput={setInput}
                />
             
          {data? renderData(): null}
          
        </div>
      );
    }
    
    export default App1;