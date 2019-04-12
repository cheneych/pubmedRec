import ArtCard from './ArtCard';
import React from 'react';
import _ from 'lodash';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { doRec } from '../../actions/user_actions';
import CollapseCheckbox from '../utils/collapseCheckbox';

class ArtPanel extends React.Component {
  constructor() {
    super();
    this.state = {arts:[], artNum:0, loadedAll:false};
  }

  componentDidMount() {
      let similar = this.props.location.state.val;
      let author_list = similar[0].Authors ? similar[0].Authors : null;      
      let val = similar[0];
      val.Abstract ? 
      this.state.arts.push({authors : author_list , number : 0, source : 'http://www.ncbi.nlm.nih.gov/pubmed/'+val.Id, title : val.Title, description : val.Abstract})
      : null;
      this.loadMoreNews();
      this.loadMoreNews = _.debounce(this.loadMoreNews, 1000);
      window.addEventListener('scroll', () => this.handleScroll());
  }

  handleScroll() {
    let scrollY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    if ((window.innerHeight + scrollY) >= (document.body.offsetHeight - 50) && !this.state.loadedAll) {
      console.log('handleScroll');
      this.loadMoreNews();
    }
  }

  async loadMoreNews() { //async,await to handle disorder problems caused by async

      let similar = this.props.location.state.val;
      // let author_list = similar[0].Authors ? similar[0].Authors : null;
      let author_list = []
      for (let i = this.state.artNum; i < this.state.artNum + 10; i++) {
        if (i >= similar[0].Sim.length) {
          this.setState({loadedAll : true});
          break;
        }
        let tmp = {};
        tmp['pmid'] = similar[0].Sim[i];
        await this.props.dispatch(doRec(tmp)).then(() =>{
          let val=this.props.user.rec;
          author_list = val[0].Authors ? val[0].Authors : null
          this.state.arts.push({authors : author_list, number : i + 1, source : 'http://www.ncbi.nlm.nih.gov/pubmed/'+val[0].PMID, title : val[0].Title, description : val[0].Abstract});
        });
      }
      this.setState({artNum : this.state.artNum + 10, arts:this.state.arts});
    }

  renderArts() {
    const arts_card_list = this.state.arts.map((one_arts, i) => {
      return(
        // <a className='list-group-item' href="#" key = {i}>
        <a className='list-group-item' key = {i}> 
          <ArtCard arts={one_arts} />
        </a>
      );
    });
    

    return(
      <div className="container-fluid">
        <div className='list-group'>
            {arts_card_list}
        </div>
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

export default withRouter(connect(mapStateToProps)(ArtPanel));