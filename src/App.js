import React , { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';

import ReactPaginate from 'react-paginate';
import Pagination from './Pagination.js'


function App() {
  
  
  const useStyles = makeStyles({
  root: {
    minWidth: 200,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [q, setQ] = useState("");
    const [searchParam] = useState(["title"]);
    const [filterParam, setFilterParam] = useState(1);

    

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/posts")
            .then((res) => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            );

    }, []);

const [currentPage, setCurrentPage] = useState(1);
    const [booksPerPage] = useState(10);

     const indexOfLastBook = currentPage * booksPerPage;
    const indexOfFirstBook = indexOfLastBook - booksPerPage;
    const currentPosts = items.slice(indexOfFirstBook, indexOfLastBook);

    
    const paginate = pageNumber => setFilterParam(pageNumber);


    
    function search(items) {
        return items.filter((item) => {
            if (item.userId == filterParam) {
                return searchParam.some((newItem) => {
                    return (
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1
                    );
                });
            } 
            else if (filterParam == "All") {
                return searchParam.some((newItem) => {
                    return (
                     
                        item[newItem]
                            .toString()
                            .toLowerCase()
                            .indexOf(q.toLowerCase()) > -1

                           
                    );
                });
            }
        });
    }

   const Book= ({books, loading}) =>{
    if (error) {
        return <>{error.message}</>;
    } else if (!isLoaded) {
        return <>loading...</>;
    } else {
        return (
            <div className="wrapper">
                <div className="search-wrapper">
                    <TextField id="outlined-basic" label="Search for..." variant="outlined"
                    type="search"
                            name="search-form"
                            value={q}
                            onChange={(e) => setQ(e.target.value) }/>
                        
                        

                    <div className="select">
                    <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Filter By Userid</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                           id="demo-simple-select"
                            onChange={(e) => {
                                setFilterParam(e.target.value);
                            }}
                            className="custom-select"
                            aria-label="Filter Cards By userid"
                        >
                            <MenuItem value="All">Filter By userid</MenuItem>
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                        </Select>
                        </FormControl>
                        <span className="focus"></span>


        
                    </div>
               </div>
               <Grid container spacing={4}>
                    
                        {
                        search(items).map((item) => (
                        <Grid item xs={12} sm={6} md={4}>

         <Card className={classes.root} variant="outlined">
    
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          
        </Typography>
        <Typography variant="h5" component="h2">
          {item.id} <br /><br />
          {item.title}<br /> <br />
        </Typography>
        
        <Typography variant="body2" component="p">
          {item.body}<br /><br /> <br /><br />
          <p className="footer">{item.userId}</p>
        </Typography>
      </CardContent>
      
    </Card>
    </Grid>
                    )) }
                </Grid>
                
            </div>
  
        );
    }}

return (
        <div className='container mt-5'>
            
            <Book books={currentPosts} loading={isLoaded}/>
            <Pagination
                booksPerPage={booksPerPage}
                totalBooks={items.length}
                paginate={paginate}
            />
        </div>
    );


}

export default App;
