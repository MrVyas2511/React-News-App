import React, { Component } from 'react'
import Newsitem from './Newsitem'
import { Spinner } from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";


export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 9,
        category: 'general'
    }
    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state =
        {
            articles: [],
            totalResult: 0,
            page: 1,
            loading: false
        }

        document.title = ` ${this.capitalizeFirstLetter(this.props.category)}-NewsApp`;

    }

    async updateNews(pageNo) {

        this.props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API}&page=${this.state.page}`;
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(60);
        this.setState({
            totalResult: parsedData.totalResult,
            articles: parsedData.articles,
        })
        this.props.setProgress(100);
    }

    fetchMoreData = async() => {
    
       this.setState({page:this.state.page+1});
       console.log(this.state.page);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.API}&page=${this.state.page}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            totalResult: parsedData.totalResult,
            articles: this.state.articles.concat(parsedData.articles)
        })
      };

    async componentDidMount() {

        this.updateNews();
    }



    render() {

        return (
            <div className="container my-3">

                <h2 className="text-center my-5">News-App - HeadLines On {this.props.category}</h2>


                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length!==this.totalResult}
                    loader={<Spinner/>}
                >

                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title.slice(0, 45) : "None"} description={element.description ? element.description.slice(0, 88) : "none"} imgurl={element.urlToImage ? element.urlToImage : "https://i2.wp.com/9to5mac.com/wp-content/uploads/sites/6/2021/10/Screen-Shot-2021-10-06-at-4.59.29-PM.jpeg?resize=1200%2C628&quality=82&strip=all&ssl=1"} newsUrl={element.url} author={element.author} date={element.publishedAt}></Newsitem>
                            </div>
                        })}
                    </div>
                    </div>
                </InfiniteScroll>

              
            </div>
        )
    }
}

export default News
