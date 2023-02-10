// using another useState const and adding in the data dirctly

import axios from 'axios';
import { useEffect, useState } from 'react';
import './App.css';

import Input  from './Input/index'
import TestScores from './Show';

function App3() {

  const [data, setData] = useState([ ])
  console.log(data, typeof data)

  const [input, setInput]= useState("")
  

  useEffect(() => {
    const url = `https://api.hatchways.io/assessment/students`
    axios
      .get(url)
      .then((response) => {
    // const arrivedData =[...response.data.students]
        response.data.students.map(i=>i.isExpanded=false );
        // console.log(arrivedData, 'original' , typeof(arrivedData))
        // arrivedData.map(i=>i.isExpanded=false );
      
        // console.log(arrivedData, 'new')

        // setData(arrivedData)
        setData(response.data.students)
       console.log (data, "data", typeof(data))
       
      })
      .catch((error) => {
        console.log("Error in api call: ", error);
      })
  }, [])

    function showGrades(clickedID){
       let copyData = [...data]
       const selectedIdx = copyData.findIndex((i)=>i.id=== clickedID)
       copyData[ selectedIdx ].isExpanded=!copyData[ selectedIdx ].isExpanded;
       setData (copyData)
      //  if(copyData[selectedIdx].isExpanded){
      //   copyData[selectedIdx].isExpanded=false;
      //  }
      //  else copyData[selectedIdx].isExpanded= true;
    // data[clickedID]
    //   setIsExpanded(false)

    //   else setIsExpanded(true)

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
                           <img src={i.pic} width="120px" height="120px" alt=""></img>
                        </div>
                        <div className='StudentDetails'>
                           <h1>{i.firstName.toUpperCase()} {i.lastName.toUpperCase()}</h1>
      
                           <p>Email: {i.email}</p>
                           <p>Company: {i.company}</p>
                           <p>Skill: {i.skill}</p>
                           <p>Average: {studentAvg}%</p></div>
                          <div className='nameSection'>
                               <button id="showButton" onClick={()=>showGrades(i.id)}><h1>{(i.isExpanded)? "-" :"+"}</h1></button>
                           
                          {(i.isExpanded)?< TestScores 
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
    
    export default App3;