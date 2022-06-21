import React from "react";

const MovieCard = ({movie , SelectedM}) =>{


    const ImagePath="https://image.tmdb.org/t/p/w500/"

    console.log(movie)

    return(
        <>
       
        <div className={"movie-card"} >
            {movie.poster_path ? <img onClick={()=> SelectedM(movie)} className={"movie-cover"} src={`${ImagePath}${movie.poster_path}`} alt=""/> : 
            
            <div className={"movieAlt"}>No Image Found</div>
            }
        <h5 className={"movie-title"}>{movie.title}</h5>
        </div>
        </>
    );

}

export default MovieCard;