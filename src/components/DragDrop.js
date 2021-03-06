import React, {useState, useContext, useEffect} from "react";
import Picture from "./Picture";
import {useDrop} from "react-dnd";
import "./DragDrop.css"
import swal from 'sweetalert'
import {UserContext} from "../App";


function DragDrop({PictureList, src}) {
    const [board, setBoard] = useState([]);
    const [Pictures, setPictures] = useState(PictureList)
    const [collected, setCollected] = useState(false)
    const {accKey, stylesTop} = useContext(UserContext)

    const [{}, dropZone] = useDrop(() => ({
        accept: "image",
        drop: (id) => addImageToBoard(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));



    const addImageToBoard = (id) => {
        const pictureList = Pictures.filter((picture) => id.id === picture.props.id);
        if (!!pictureList[0]) {

            setBoard((board) => {
                if (board.length === 4) {
                    setCollected(true)

                    return swal({
                        title: "Good job!",
                        text: `You finished recruitment for ${src}s!`,
                        icon: "success",
                        button: "Continue!",
                    });

                }
                return [...board, pictureList[0]]

            })
            let i = Pictures.findIndex((picture) => id.id === picture.props.id)
            let p = Pictures

            p.splice(i, 1)
            setPictures(p)

        } else {
            return swal("Wrong recruitment!", "...Be carefully!");
        }
    };

    return (
        <>
            <div className="Pictures">
                {Pictures.map((picture) => {
                    return <Picture alt={picture.props.alt} src={picture.props.src} id={picture.props.id}
                                    key={picture.props.id}/>;
                })}
            </div>


            {src === accKey ?
                collected ?
                    <div></div>
                    :
                    <div className="Board" ref={dropZone} style={{top: stylesTop * 120 + 130 + 'px'}}>
                        <p className={"paragraph"}> Group {src}s</p>
                        <div className={'flex-row'}>{board.map((picture) => {
                            return <Picture src={picture.props.src} id={picture.props.id} key={picture.props.id}/>;
                        })}</div>
                    </div>
                : <div></div>
            }
        </>
    );
}

export default DragDrop;
