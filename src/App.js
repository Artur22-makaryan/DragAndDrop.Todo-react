import './App.css';
import {useState} from "react";
import Searching from "./components/Searching";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";


function App() {
    const [search, setSearch] = useState('')
    const [src, setSrc] = useState([])

    function SearchImages() {
        setSrc(search.split(' '))
        // console.log(search.split(' '))
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="App flex-col">
                <div className={'flex-row'}>
                    <input className={'onlyoneinput'} type="text" value={search}
                           onChange={(e) => setSearch(e.target.value)}/>
                    <button onClick={SearchImages} className={'btn-search'}>Search</button>
                </div>
                <div className={'searched-images '}>{
                    src.map((e, i) => <div key={i} className={'m flex-row'}>
                        <Searching src={e}/>
                    </div>)
                }
                </div>
                <div className={'flex-row bts'}>
                    {src.map((e, i, arr) => {
                        if (!!e) {
                            return (
                                <button key={i} className={"btn-appro"}><span
                                    className={"btn-text"}>{arr[i]}</span></button>
                            )
                        }
                    })}
                </div>


            </div>
        </DndProvider>
    );
}

export default App;
