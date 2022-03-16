import express from 'express';
import data_movie from './share/data-movies.js';
import moviesController from './controllers/moviesController.js';
import clientErrorHandler from './middlewares/errorHandler.js';
import HttpError from "http-errors";

const app = express();

app.use(express.json());

//Todas las peliculas donde participa "Robert Duvall"
app.post("/movies/searchFromActor", (req, res) => {
    const actor = req.body.value;
    data_movie.req = { value: actor };
    moviesController.getMoviesFromActor(data_movie);

    res.send(data_movie.res);
});

// Película con id:2
app.get("/movies/:id", (req, res, next) => {
    try {

        const id = req.params.id;
        data_movie.req = { id: id };
        moviesController.getMovieById(data_movie);
    
        res.send(data_movie.res);
        
    } catch (error) {
        next(HttpError(400, { message: 'Verifica Id' }));
    }
    

    // try {
    //     const id = req.params.id;
    //     data_movie.req = { id: id };
    //     moviesController.getMovieById(data_movie);

    //     res.send(data_movie.res);
    // } catch (error) {
    //     res.status(error.status || 500).send({
    //         error: {
    //             status: error.status || 500,
    //             message: error.message || "Internal Server Error",
    //         },
    //     });
    // }
});

// Añade una nueva película 
app.put("/movies/add", (req, res) => {
    const new_movie = req.body;
    //Existe id?
    data_movie.req = new_movie;
    moviesController.createMovie(data_movie);

    res.send(data_movie.res);
});

// Modifica la película con id:3
app.put("/movies/update", (req, res) => {
    const new_movie_update = req.body;
    data_movie.req = new_movie_update;
    moviesController.updateMovie(data_movie);

    res.send(data_movie.res);
});

app.use(clientErrorHandler);

export default app;