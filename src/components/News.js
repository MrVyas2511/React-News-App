import React, { Component } from 'react'
import Newsitem from './Newsitem'

export class News extends Component {

    constructor() {
        super();
        console.log("i am constructor");
        this.state = 
         {
            articles: [],
            page: 1
       }

    }
    async componentDidMount(){

        let url = "https://newsapi.org/v2/top-headlines?country=in&apiKey=998ccae11b914e81b8da983bc7599023&pageSize=21";
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : parsedData.articles,totalResult: parsedData.totalResult});
    }

    handlePrevClick=async()=>{

        let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=998ccae11b914e81b8da983bc7599023&page=${this.state.pag-+1}&pageSize=21`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({articles : parsedData.articles});
        this.setState({
            page : this.state.page-1,
            articles: parsedData.articles
        })
    }

    handleNextClick=async()=>{
    console.log("next");

    if(this.state.page+1>Math.ceil(this.state.totalResult/20))
    {

    }
    else{
    
    let url = `https://newsapi.org/v2/top-headlines?country=in&apiKey=998ccae11b914e81b8da983bc7599023&page=${this.state.page+1}&pageSize=21`;
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
        page : this.state.page+1,
        articles : parsedData.articles

    })
}
    }
    render() {
        return (
            <div className="container my-3">
                <h2 className="text-center my-5">News-App || HeadLines</h2>

                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem  title={element.title.slice(0,45)} description={element.description.slice(0,88)} imgurl={element.urlToImage?element.urlToImage:"https://i2.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/10/Screen-Shot-2021-10-06-at-4.59.29-PM.jpeg?resize=1200%2C628&quality=82&strip=all&ssl=1"} newsUrl={element.url}></Newsitem>
                        </div>
                      })}
                </div>

                      <div className="container d-flex justify-content-between">

                      <button type="button" disabled={this.state.page<=1} class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                      <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                      </div>
            </div>
        )
    }
}

export default News
