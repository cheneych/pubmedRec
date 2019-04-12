import React from 'react';
import ExpandCollapse from 'react-expand-collapse';
import SelectInput from '@material-ui/core/Select/SelectInput';
import { withRouter } from 'react-router-dom';
class UserArtsCard extends React.Component {
  constructor() {
    super();
    this.state = {authors_len : 5, bck:'news-container'};
    this.showAll = this.showAll.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.state.bck == "news-container" ? this.setState({bck:"news-container2"}) : this.setState({bck:"news-container"});
  }

  redirectToUrl(url, event) {
    console.log(url);
    window.open(url, '_blank');
  }

  showAll(event) {
    console.log('showall');
    if (this.state.authors_len === 5) this.setState({authors_len : 1000}); 
    else this.setState({authors_len : 5});
  }

  handleClick() {
    this.state.bck == "news-container" ? this.setState({bck:"news-container2"}) : this.setState({bck:"news-container"});
  }

  render() {
    let authors = ''
    for (var index in this.props.arts.authors) {
      authors += this.props.arts.authors[index] + ' '
    }
    return(
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
                 <div className = "authors" onClick={()=>this.showAll()}>
                    {authors ? (authors.length > this.state.authors_len ? authors.substr(0, this.state.authors_len) + '...' : authors) :  " "}
                 </div>
                <div className="news-description">
                <ExpandCollapse
                  previewHeight = "75px"
                  expandText = "Read more"
                >
                  <p>{this.props.arts.description}</p>
                  </ExpandCollapse>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserArtsCard);