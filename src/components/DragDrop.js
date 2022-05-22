import React, {useEffect, useState} from "react";
import Picture from "./Picture";
import {useDrop} from "react-dnd";
import "./DragDrop.css"
import swal from 'sweetalert'

function DragDrop({PictureList,src,accKey,stylesTop}) {
    const [board, setBoard] = useState([]);
    const [Pictures, setPictures] = useState(PictureList)
    const [collected, setColected] = useState(false)
    const [opened, setOpened] = useState(false)
    const [top,setTop] = useState(stylesTop)

    //console.log(accKey)
    const [{isOver}, dropZone] = useDrop(() => ({
        accept: "image",
        drop: (id) => addImageToBoard(id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    useEffect(()=>{

        if(src === accKey[0]){
            setOpened(accKey[1])
        }else{
            setOpened(false)
        }
    },accKey)

    const addImageToBoard = (id) => {
        const pictureList = Pictures.filter((picture) => id.id === picture.props.id);
        if (!!pictureList[0]) {

            setBoard((board) => {
                if (board.length === 4) {
                    setColected(true)
                    setTop(top-1)
                    swal({
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
            if (i === 0) {
                p.shift()
                setPictures(p)
            } else {
                p.splice(i, 1)
                setPictures(p)
            }
        } else {
            swal("Wrong recruitment!", "...Be carefully!");
        }
    };
   // console.log(Pictures)
    return (
        <>
            <div className="Pictures">
                {Pictures.map((picture) => {
                    return <Picture alt={picture.props.alt} src={picture.props.src} id={picture.props.id}
                                    key={picture.props.id}/>;
                })}
            </div>
            {opened ?
                collected ?
                    <div></div>
                    :
                    <div className="Board" ref={dropZone} style={{top: top * 120 + 130 +  'px'}}>
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
