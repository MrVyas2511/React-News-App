import React, { Component } from 'react'

export class Newsitem extends Component {
  
    render() {

        let {title,description,imgurl,newsUrl}=this.props;
        return (
            <div>
                <div className="card my-2" style={{width: "18rem"}}>
                    <img src={imgurl} className="card-img-top" alt="..."/>
                    <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <a rel="noreferrer" href={newsUrl} target="_blank" className="btn-sm btn-primary">Read more</a>
                    </div>
                </div>
            </div>
        )
    }
}
export default Newsitem
