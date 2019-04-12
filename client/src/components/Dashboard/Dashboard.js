import UserArtCard from './UserArtCard';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { doUserartlist } from '../../actions/user_actions';
import React, { Component } from 'react';
import { doUserrec } from '../../actions/user_actions';

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {arts:[], artNum:0, loadedAll:false};
  }

  componentDidMount() {
    let results = [];
    this.props.dispatch(doUserartlist(20)).then(() =>{
        results = this.props.user.artlist;
        for (let i = this.state.artNum; i < 22; i++) {
          if (i == 21) {
            this.setState({loadedAll : true});
            break;
          }
          let res = results[i];
          let author_list = res.Authors ? res.Authors : null;
          this.state.arts.push({authors : author_list, number : i + 1, source : 'http://www.ncbi.nlm.nih.gov/pubmed/'+res.PMID, title : res.Title, description : res.Abstract});
          this.setState({arts:this.state.arts});
        }
    });
  }


  submitForm = (event) =>{
    event.preventDefault();
    this.props.dispatch(doUserrec()).then(response =>{
        if(response.payload){
            let val=response.payload;
            val[0].Sim = val[0].pmids;
            var shuffle = require('shuffle-array');
            shuffle(val[0].Sim);
            this.props.history.push({pathname:'/recommend',state:{val}})
        }
    });
  }

  renderArts() {
    const arts_card_list = this.state.arts.map((one_arts, i) => {
      return(
        // <a className='list-group-item' href="#" key = {i}>
        <a className='list-group-item' key = {i}>
          <UserArtCard arts={one_arts} />
        </a>
      );
    });

    return(
      <div className="container-fluid">
        <div className='list-group'>
          {arts_card_list}
        </div>
        <div>
          <button className="card_link" onClick={(event)=> this.submitForm(event)}>
              Go
          </button>
        </div>
        <br/>
      </div>
    )
  }

  render() {
    if (this.state.arts) {
      return(
        <div>
          {this.renderArts()}
        </div>
      );
    } else {
      return(
        <div id='msg-app-loading'>
          Loading...
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
      user: state.user
  }
}

export default withRouter(connect(mapStateToProps)(Dashboard));