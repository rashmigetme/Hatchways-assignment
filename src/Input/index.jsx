
import './input.css';



function Input ( props){

const {input, setInput}= props

return(
<div className='SearchSection'>

    <input  type ="text" onChange ={(e)=>{setInput(e.target.value)}} value ={input}
    placeholder="Search By Name"></input>
</div>

);

}
export default Input;