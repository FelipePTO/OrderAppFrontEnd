import './App.css';
import { useEffect, useState } from 'react';

const App = () => {

  const [HistoryList, setHistoryList] = useState([])
  const [input, setInput] = useState("")
  const [output, setOutput] = useState({dish:"", input:""})
  const [Error, setError] = useState("")

  const AddOrder = async () =>{
      let data = await fetch("https://localhost:5001/Restaurant", {
        method: "POST",
        body: JSON.stringify({
          listDishes: input
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      });
      
      if(data.status===200){
        let json = await data.json();
        setOutput(json)
        setTimeout(()=>{
          setOutput({dish:"", input:""})
        },5000)
        await getHisoryList();
      }

      if(data.status===500){
        setError(await data.json())
      }
    
  }

  const getHisoryList = async () => {
    let data = await fetch("https://localhost:5001/Restaurant");
    let json = await data.json();
    setHistoryList(json)
  }

  useEffect(() => {
    getHisoryList();
  }, [])

  return (
    <div className="App">
      <div className="formOrder">
        <div>
          <input type="input" onChange={(e)=>setInput(e.target.value)} value={input}></input>
          <input type="button" onClick={()=>AddOrder()} value="send"></input>
          {Error}
        </div>
        {output.input!==""&&<div><span>Input: </span>{output.input}<span> Output: </span>{output.dish}</div>}
      </div>
      <table className="tableAddOrder">
        {HistoryList.map(d=>{
          return <tr>
                      <td><span>Input: </span>{d.input}</td>
                      <td><span>Output: </span>{d.dish}</td>
                  </tr>             
        })}
       </table>
    </div>
  );
}

export default App;
