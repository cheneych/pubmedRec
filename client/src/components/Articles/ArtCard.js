import React from 'react';
import ExpandCollapse from 'react-expand-collapse';
import ArtBot from './ArtBot';
import { withRouter } from 'react-router-dom';
class ArtsCard extends React.Component {
  constructor() {
    super();
    this.state = {authors_len : 5, bck : "news-container"};
    this.handleClick = this.handleClick.bind(this);
  }

  redirectToUrl(url, event) {
    
    // this.sendClickLog();
    console.log('Redirect');
    window.open(url, '_blank');
  }

  handleClick() {
    this.state.bck == "news-container" ? this.setState({bck:"news-container2"}) : this.setState({bck:"news-container"});
  }

  showAll(authors, event) {
    console.log('showAll');
    if (this.state.authors_len === 5) this.setState({authors_len : 1000});
    else this.setState({authors_len : 5});
  }

//   sendClickLog() {
//     const url = "http://" + window.location.hostname + ":3000" + "/news/userId/"
//         + Auth.getEmail() + "/newsId/" + this.props.news.digest;

//     const request = new Request(
//       encodeURI(url),
//       {
//         method: "POST",
//         headers: { "Authorization": "bearer " + Auth.getToken() },
//       }
//     );

//     fetch(request);
//   }


  render() {
    let authors = ''
    for (var index in this.props.arts.authors) {
      authors += this.props.arts.authors[index] + ' '
    }
    return(
      // <div className="news-container" onClick={this.handleClick}>
      <div className={this.state.bck} onClick={this.handleClick}>
        <div className='row'>
          <div>
            <div className="news-intro-col">
              <div className="news-intro-panel">
              <h3>
                {this.props.arts.number === 0 && <div> Input article </div>}
              </h3>
              <h6>
                {this.props.arts.number === 0 && <div> Currently viewing recommendations for this article </div>}
              </h6>
              {this.props.arts.number === 0 && <hr />}
              <div onClick={() => this.redirectToUrl(this.props.arts.source)}>
                 <h4>{this.props.arts.number > 0 && this.props.arts.number + '.'}{this.props.arts.title}</h4>
              </div>
                 <div className = "authors" onClick={()=>this.showAll(authors)}>
                    {authors ? (authors.length > this.state.authors_len ? authors.substr(0, this.state.authors_len) + '...' : authors) :  " "}
                 </div> 
                <div className="news-description">
                <ExpandCollapse
                  previewHeight = "75px"
                  expandText = "Read more"
                >
                  <p>{this.props.arts.description}</p>
                  </ExpandCollapse>
                  {this.props.arts.number > 0 ? <ArtBot arts={this.props.arts} /> : null}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(ArtsCard);