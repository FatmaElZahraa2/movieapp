import React, { useState } from "react";
import {useEffect} from "react"
import axios  from "axios";
import MovieCard from "./MovieCard";
import './Movies.css'
import ReactPaginate from "react-paginate"; 


function Products(){

    const APIKey="b392cc23344dd496ba406c1314b711ae"
    const ImagePath="https://image.tmdb.org/t/p/original/"
    const [movies ,setMovies] = useState([])
    const [keyword ,setSearch] = useState("")
    const [SelectedM , SetSelectedM] = useState({})
    const [Page , setPage] = useState (1)

    const fetching = async (Page ,keyword) =>{
         
        console.log("Page" + Page)
        const kind = keyword ? "search/movie" : "discover/movie";

        const {data : {results}} = await axios.get(`https://api.themoviedb.org/3/${kind}?api_key=${APIKey}&page=${Page}` , {

        params:{
            api_key :process.env.REACT_APP_API ,
            query : keyword
          
             }

        })
       
        SetSelectedM(results[2])
        setMovies(results)
    }

    useEffect( () =>{

fetching(Page)

    },[])

    const renderMovies = () =>(
        movies.map(movie =>(
            <MovieCard  

             key={movie.id}
              movie={movie}
              SelectedM={SetSelectedM}
              />
              
        ))
    )

    const SearchForMovie = (e) =>{

        e.preventDefault();
        fetching(Page ,keyword)
    }

    const GetChoosenPage = (clicked) =>{

        let p = clicked.selected;
        setPage(p+1)
        console.log(clicked.selected)
        console.log("***>>"+Page)
        fetching(Page)
         
    }

    return(
        <>
           <header className={"header"}>
              <div className={"headerDiv DivCenter"}>
                        <h1>Movie Application</h1>
                        <form onSubmit={SearchForMovie}>
                            <input type="text" placeholder="Search For A Movie" onChange={(e)=>setSearch(e.target.value)}/>
                            <button type={"submit"}>Search</button>
                        </form>
              </div>
           </header>



           <div className="BigMovie" style={{   backgroundImage: `url('${ImagePath}${SelectedM.backdrop_path}')`   }}>
             <div className="BigMoviepanel DivCenter">
                       <h1 className={"BigMovieTitle"}>{SelectedM.title}</h1>
                       {SelectedM.overview ?<p> {SelectedM.overview }</p>:null }
             </div>
           </div>

            <div className="container DivCenter">
                 {renderMovies()}
            </div>
            <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={12}
            marginPagesDisplayed={3}
            pageRangeDisplayed={6}
            onPageChange={GetChoosenPage}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            activeClassName={'active'}
        
            />
        </>
    );
}

export default Products;