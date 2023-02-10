import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import Input  from './Input/index'
import TestScores from './Show';
import useHookForApi from './useHookForApi';
//adding the button which will toggle the test scores using useState
function App() {

  const [data, setData] = useState([])
  const [input, setInput]= useState("")
   const [clickedCard, setClickedCard]= useState('')
 // const [receivedData, error] = useHookForApi("https://api.hatchways.io/assessment/students")
  

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
  
  if(clickedCard===clickedID){
    return setClickedCard('')
  
  }
  
    setClickedCard(clickedID)
 }

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
                            <img src={i.pic} width="120px" height="120px" alt="ProfilePic"></img>
                          </div>
                          <div>
                          
        
      <h1>{i.firstName.toUpperCase()} {i.lastName.toUpperCase()}</h1>
     
      <p>Email: {i.email}</p>
       <p>Company: {i.company}</p>
     <p>Skill: {i.skill}</p>
     <p>Average: {studentAvg}%</p></div>
     <div className='nameSection'>
     <button id="showButton" onClick={()=>showGrades(i.id)}><h1>{i.id===clickedCard? "-" :"+"}</h1></button>
    {i.id ===clickedCard?< TestScores 
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

export default App;
// scrolling of only outercontainer, key to the code as per warning(first tag or div after map function), add tag button