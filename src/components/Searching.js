// import React, {Component} from 'react';
// import './Searching.css'
//
// class Searching extends Component {
//     constructor() {
//         super();
//         this.state = {
//             pictures: [],
//         };
//     }
//
//     componentDidMount() {
//         console.log(!!this.props.src)
//         fetch('https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=' + process.env.REACT_APP_API_KEY + '&tags='+ this.props.src +'&per_page=5&page=1&format=json&nojsoncallback=1')
//             .then(function (response) {
//                 return response.json();
//             })
//             .then(function (j) {
//
//                 let picArray = j.photos.photo.map((pic) => {
//                     var srcPath = 'https://farm' + pic.farm + '.staticflickr.com/' + pic.server + '/' + pic.id + '_' + pic.secret + '.jpg';
//                     return (
//                         <img alt={this.props.src} src={srcPath}></img>
//                     )
//                 })
//                 this.setState({pictures: picArray});
//             }.bind(this))
//     }
//
//     render() {
//         return (
//             <div className={"imgs"}>
//                     {this.state.pictures.map((el,index)=>{
//                         return (
//                             <div key={index}>
//                                {el}
//                             </div>
//                         )
//                     })
//                     }
//             </div>
//         );
//     }
// }
//
// export default Searching;


import React, {useEffect, useState} from 'react';
import './Searching.css'

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
                        <img alt={src} src={srcPath}></img>
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
                searched ? <div className={"imgs"}>
                    {pictures.map((el, index) => {
                        return (
                            <div key={index}>
                                {el}
                            </div>
                        )
                    })
                    }
                </div> : <div className={"imgs"}>

                </div>
            }

        </>

    );

}

export default Searching;

