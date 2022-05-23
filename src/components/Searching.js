import React, {useEffect, useState} from 'react';
import './Searching.css'
import DragDrop from "./DragDrop";


function Searching({src}) {
    const [pictures, setPictures] = useState([])

    const [searched, setSearched] = useState(false)

    useEffect(() => {
        fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + process.env.REACT_APP_API_KEY + '&tags=' + src + '&per_page=5&page=1&format=json&nojsoncallback=1')
            .then(function (response) {
                return response.json();
            })
            .then(function (j) {
                let picArray = j.photos.photo.map((pic) => {
                    var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';

                    return (
                        <img alt={src} src={srcPath} id={pic.id}></img>
                    )
                })
                setSearched(true)
                setPictures(picArray);
            }).catch((e) => {
            setSearched(false)
        })

    }, [src])

    return (
        <>
            {
                searched ?
                    <div>
                        <DragDrop src={src} PictureList={pictures}  />
                    </div>
                 : <div className={"imgs"}>

                </div>
            }

        </>
    );

}

export default Searching;

