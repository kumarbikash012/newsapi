import React, {useEffect, useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


const News = (props)=>  {
 const [articles, setArticles] = useState([])
 const [loading, setloading] = useState(true)
 const [page, setPage] = useState(1)
 const [totalResults, settotalResult] = useState(0)


const capitalizeFirstLetter = (string)=> {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  

  // constructor(props){
  //   super(props); 
  //   // console.log("hello I am bikash")
   
  // }

  const updateNews = async ()=>{
props.setProgress(10);
  const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
setloading(true);
let data= await fetch(url);
props.setProgress(30);
let parsedData= await data.json();
props.setProgress(70);

setArticles(parsedData.articles);
settotalResult(parsedData.totalResults)
setloading(false);

// setState({articles: parsedData.articles, 
//   totalResults:parsedData.totalResults, 
//   loading:false})

props.setProgress(100);

  } 

useEffect(() => {
   document.title = `${capitalizeFirstLetter(props.category)} - ToofanExpress`;
updateNews();
// eslint-disabled-next-line
}, [])


//  const handlePrevclick = async ()=>{
//  setPage(page-1)
//  updateNews();

//   }

//   const handleNextclick = async ()=>{

// setPage(page+1)
// updateNews();


  // }

  const fetchMoreData = async() => { 
   const url=`https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page +1}&pageSize=${props.pageSize}`;
   setPage(page+1)
   let data= await fetch(url);
   let parsedData= await data.json();
   console.log(parsedData);
   setArticles(articles.concat(parsedData.articles))
   settotalResult(parsedData.totalResults)
   
  }

    return (
      <div className='container my-3'>
      <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px' }}>Top  {capitalizeFirstLetter(props.category)} Headlines</h1>
      {loading && <Spinner/>}

      <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner/>}
        >
<div className="container">
      <div className="row">
      {articles.map((element)=>{
       return <div className="col-md-4" key={element.url}>
      <NewsItem title={element.title?element.title.slice(0, 45):""} 
      description={element.description?element.description.slice(0, 88):""} 
      imgUrl={element.urlToImage} newsUrl={element.url} author={element.author}
      date={element.publishedAt} source={element.source.name}  />
      </div>
      })} 
    
      </div>
      </div>
      </InfiniteScroll>
      </div>
    )
  
    

News.defaultProps = {
  coutry: 'in',
  pageSize: '8',
  category: 'general'
}
News.TypeScripts = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
}
  }
export default News
