import React, { Component } from 'react'
import NeswItem from './NewsItem'

export class News extends Component {
  constructor(){
    super();
    this.state={
      articles : null,
      loading : false,
      page: 1
    }
  }


  componentDidMount(){
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6b7e56a08cfa4ab5b732534618286b15&page=1&pageSize=${this.props.pageSize}`
    fetch(url).then((res)=>{
        res.json().then((result)=>{
            // console.log(result.articles)
            this.setState({articles:result.articles, totalResults:result.totalResults})
        })
    })
}

handleNextClick = async () => {
  // console.log("Next");
  if(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {

  }
  else {
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6b7e56a08cfa4ab5b732534618286b15&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`
    fetch(url).then((res)=>{
        res.json().then((result)=>{
            // console.log(result.articles)
            this.setState({
              articles:result.articles,
              page: this.state.page + 1
            })
        })
    })
  }
}

handlePrevClick = async () => {
  // console.log("Previous");
  let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=6b7e56a08cfa4ab5b732534618286b15&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
  fetch(url).then((res)=>{
      res.json().then((result)=>{
          // console.log(result.articles)
          this.setState({
            articles:result.articles,
            page: this.state.page - 1
          })
      })
  })

}

  render() {
    return (
      <>
      
    <div className="container my-3">
      
      <h2 className='text-center'>Top Headlines</h2>
      <div className='row'>
        {this.state.articles ?
        this.state.articles.map((element)=>
           <div className="col-md-4" key={element.url} >
        <NeswItem title={element.title?.slice(0, 45)} description={element.description?.slice(0, 88)} imageUrl={element.urlToImage} newsUrl={element.url}/>
        </div>
        )
        : null
        }
        
      </div>
        <div className="container d-flex justify-content-between">
          <button type='button' disabled={this.state.page<=1} className='btn btn-dark'onClick={this.handlePrevClick} > &larr; Previous</button> 
          <button type='button' disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className='btn btn-dark' onClick={this.handleNextClick}> Next &rarr;</button> 

        </div>
      </div>
      </>
    )
  }
}

export default News