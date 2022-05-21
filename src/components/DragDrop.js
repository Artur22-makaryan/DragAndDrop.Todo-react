import React, {useRef, useState} from "react";
import Picture from "./Picture";
import {useDrop} from "react-dnd";
import "./DragDrop.css"
import swal from 'sweetalert'

function DragDrop({PictureList}) {
    const [board, setBoard] = useState([]);
    const [Pictures, setPictures] = useState(PictureList)

    const [{isOver}, dropZone] = useDrop(() => ({
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
                    swal({
                        title: "Good job!",
                        text: "You finished recruitment!",
                        icon: "success",
                        button: "Continue!",
                    });

                }
                return [...board, pictureList[0]]

            })
            let i = Pictures.findIndex((picture) => id.id === picture.props.id)
            let p = Pictures
            if (i === 0) {
                p.shift()
                setPictures(p)
            } else {
                p.splice(i, i)
                setPictures(p)
            }
        } else {
           swal("Wrong recruitment!", "...Be carefully!");
        }
    };
    console.log(Pictures)
    return (
        <>
            <div className="Pictures">
                {Pictures.map((picture) => {
                    return <Picture alt={picture.props.alt} src={picture.props.src} id={picture.props.id}
                                    key={picture.props.id}/>;
                })}
            </div>

            <div className="Board" ref={dropZone}>
                <p className={"paragraph"}> Group Pics</p>
                <div className={'flex-row'}>{board.map((picture) => {
                    return <Picture src={picture.props.src} id={picture.props.id} key={picture.props.id}/>;
                })}</div>
            </div>
        </>
    );
}

export default DragDrop;
