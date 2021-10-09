import React, { Component } from 'react'
import Newsitem from './Newsitem'
import spinner, { Spinner } from './Spinner';
import PropTypes from 'prop-types'


export class News extends Component {

    static defaultProps={
        country :"in",
        pageSize: 9,
        category: 'general'
    }
    static propTypes={
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

     capitalizeFirstLetter=(string)=> {
        return string.charAt(0).toUpperCase() + string.slice(1);
      }

    constructor(props) {
        super(props);
        console.log("i am constructor");
        this.state =
        {
            articles: [],
            totalResult:0,
            page: 1,
            loading: false
        }

        document.title =` ${this.capitalizeFirstLetter(this.props.category)}-NewsApp`;

    }

    async updateNews(pageNo){

        console.log(this.state.page);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=998ccae11b914e81b8da983bc7599023&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading: true});
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            totalResult: parsedData.totalResult,
            articles: parsedData.articles,
            loading:false
        })
    }
    async componentDidMount() {

       this.updateNews();
    }


    handlePrevClick = async () => {
  
        this.setState({page:this.state.page - 1});
        this.updateNews();
    }

    handleNextClick = async () => {

            this.setState({page: this.state.page + 1});
            console.log(this.state.page);
            this.updateNews();
    }
 
    render() {

        return (
            <div className="container my-3">

                <h2 className="text-center my-5">News-App - HeadLines On {this.props.category}</h2>

                
                {this.state.loading && <Spinner/>}
   
                <div className="row">
                    {this.state.articles.map((element) => {
                        return <div className="col-md-4" key={element.url}>
                            <Newsitem title={element.title?element.title.slice(0, 45):"None"} description={element.description?element.description.slice(0, 88):"none"} imgurl={element.urlToImage ? element.urlToImage : "https://i2.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/10/Screen-Shot-2021-10-06-at-4.59.29-PM.jpeg?resize=1200%2C628&quality=82&strip=all&ssl=1"} newsUrl={element.url} author={element.author} date={element.publishedAt}></Newsitem>
                        </div>
                    })}
                </div>

                <div className="container d-flex justify-content-between">

                    <button type="button" disabled={this.state.page <= 1} class="btn btn-dark" onClick={this.handlePrevClick}> &larr; Previous</button>
                    <button type="button" class="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>

                </div>
            </div>
        )
    }
}

export default News
