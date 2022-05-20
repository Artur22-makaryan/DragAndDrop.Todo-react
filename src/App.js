import './App.css';
import {useState} from "react";
import Searching from "./components/Searching";

function App() {
    const [search, setSearch] = useState('')
    const [src, setSrc] = useState([])

    function SearchImages() {
        setSrc(search.split(' '))
        console.log(search.split(' '))
    }

    return (
        <div className="App">
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={SearchImages}>Search</button>
            {
                src.map((e, i) => <div key={i}>
                    <Searching src={e}/>
                </div>)
            }


        </div>
    );
}

export default App;
