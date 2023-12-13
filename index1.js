import express from "express"
import bodyParser from "body-parser";
import axios from "axios"

const app = express()
const port = 3000
app.use(bodyParser.urlencoded({extended:true}))



const API_URL = 'https://movies-tv-shows-database.p.rapidapi.com'



app.get("/",(req,res) => {
    res.render("index.ejs")
})



app.post("/submit",async(req,res) => {
    const title = req.body.title
    const options = {
        method: 'GET',
        url: 'https://movies-tv-shows-database.p.rapidapi.com/',
        params: {
          title: title,
        },
        headers: {
          Type: 'get-movies-by-title',
          'X-RapidAPI-Key': '8ca7137f88mshf1e09c0e146207fp1a07ffjsne1e5554e8246',
          'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
        }
      };

    console.log(title)
    try {
        const result = await axios.request(options);
        const id = result.data.movie_results[0].imdb_id
        // console.log(id)
        
          const options1 = {
            method: 'GET',
            url: 'https://movies-tv-shows-database.p.rapidapi.com/',
            params: {
              movieid: id
            },
            headers: {
              Type: 'get-movie-details',
              
              'X-RapidAPI-Key': '8ca7137f88mshf1e09c0e146207fp1a07ffjsne1e5554e8246',
            //   'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
            }
          };
          const result2 = await axios.request(options1);
    //    console.log(result2.data)
       const options2 = {
        method: 'GET',
        url: 'https://movies-tv-shows-database.p.rapidapi.com/',
        params: {
          movieid: id
        },
        headers: {
          Type:  'get-movies-images-by-imdb',
          
          'X-RapidAPI-Key': '8ca7137f88mshf1e09c0e146207fp1a07ffjsne1e5554e8246',
        //   'X-RapidAPI-Host': 'movies-tv-shows-database.p.rapidapi.com'
        }
      };
      const result3 = await axios.request(options2);
//    console.log(result3.data.poster)
   res.render("index1.ejs",{info:result2.data,image:result3.data.poster})
    } catch (error) {
        console.error(error);
    }
    
    
})

app.listen(port,() => {console.log(`Server is running on port ${port}`)})