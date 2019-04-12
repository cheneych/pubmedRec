import React from 'react';
import { withRouter } from 'react-router-dom';
class ArtBot extends React.Component {
  render() {
    return(
      <div>
        <br />
        <hr className = 'line' />
        <div className = 'artbot'>
          <div className='chip light-green news-chip'> Relevant</div>
          <div className='chip amber news-chip'>Somewhat</div>
          <div className='chip red news-chip'>Irrelevant</div>
        </div>
      </div>
    );
  }
}

export default withRouter(ArtBot);