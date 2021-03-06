import classNames from 'classnames';
import React from 'react';

import setActiveOnDeck from '../../actions/setActiveOnDeck';

import BlockText from './BlockText';
import Meta from './Meta';
import Links from './Links';
import Progress from './Progress';


export default class OnDeckItem extends React.Component {
  static contextTypes = {
    executeAction: React.PropTypes.func
  };

  getClassNames () {
    return classNames([
      this.props.item['Status'].toLowerCase(),
      this.props.isActive ? 'active' : 'inactive'
    ]);
  }

  setAsActive () {
    this.context.executeAction(setActiveOnDeck, this.props.item['id']);
  }

  render () {
    return (
      <article className={this.getClassNames()} onClick={this.setAsActive.bind(this)}>
        <h2>
          <span className="index">{this.props.index + 1}</span>
          {this.props.item['name']}
        </h2>
        <Meta {...this.props}/>
        <Links {...this.props}/>
        <Progress {...this.props}/>
        <BlockText label="Next Steps" value={this.props.item['Next Step']}/>
      </article>
    );
  }
}
