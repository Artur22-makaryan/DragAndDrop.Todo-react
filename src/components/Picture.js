import React from "react";
import { useDrag } from "react-dnd";


function Picture({ id, src ,alt}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "image",
    item: { id: id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));
  return (
      <a href={src} target={'_blank'}>
        <img
      ref={drag}
      src={src}
      alt={alt}
      width="100px"
      style={{ border: isDragging ? "3px dashed gray" : "0px" }}
    />
      </a>

  );
}

export default Picture;
