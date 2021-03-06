import './App.css';
import {useState, createContext} from "react";
import Searching from "./components/Searching";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";


 export const UserContext = createContext()
function App() {
    const [search, setSearch] = useState('')
    const [src, setSrc] = useState([])
    const [accKey, setAccKey] = useState([])

    function SearchImages() {
        setSrc(search.split(' '))

    }

    function OpeningGroup(e) {
        setAccKey(e)
    }
    let context = {accKey,stylesTop:src.filter((e) => !!e).length}
    return (

        <DndProvider backend={HTML5Backend}>
            <div className="App flex-col">
                <div className={'flex-row'}>
                    <input className={'onlyoneinput'} type="text" value={search}
                           onChange={(e) => setSearch(e.target.value)}/>
                    <button onClick={SearchImages} className={'btn-search'}>Search</button>
                </div>
                <div className={'searched-images '}>{
                    src.map((e, i, src) => <div key={i} className={'m flex-row'}>
                        <UserContext.Provider value={context} >
                            <Searching src={e} />
                        </UserContext.Provider>
                    </div>)
                }
                </div>
                <div className={'flex-row bts'}>
                    {src.map((e, i, arr) => {
                        if (!!e) {
                            return (
                                <span
                                    key={i}
                                    className={"btn-appro btn-text"}
                                    onClick={(e) => {
                                        OpeningGroup(e.target.innerText)
                                    }}
                                >{e}</span>
                            )
                        }
                    })}
                </div>


            </div>
        </DndProvider>
    );
}

export default App;
