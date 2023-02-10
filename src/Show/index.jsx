

function TestScores({grades}){

  

return(
<div>
{grades.map((i,idx)=>{
    
     return <p key={idx}>Test {idx+1} :{""}{ i}%

     </p>
    }
)

}
</div>
);

}
export default TestScores;