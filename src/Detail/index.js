import React from 'react';
import { Link } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import bigPicture from './big-picture.jpg';

/* Detail Page. */
@hot(module)
class Detail extends React.Component {
  /* Render Detail Page. */
  render() {
    return (
      <div>
        <div>Detail Page</div>
        <div><Link to="/">Redirect List Page</Link></div>
        <div>
          Images smaller than 8K will be processed by url-loader
          as inline resources. Other images will be processed by
          file-loader as external resources.
        </div>
        <img alt="" src={bigPicture} />
      </div>
    );
  }
}

export default Detail;
