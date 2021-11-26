import React, { Component } from 'react';
import md5 from 'crypto-js/md5';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { scores } from '../redux/actions';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      points: 0,
    };
  }

  componentDidMount() {
    const { dispatchScore } = this.props;
    const { points } = this.state;
    dispatchScore(points);
  }

  render() {
    const { email } = this.props;
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const hash = md5(email).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt="User"
        />
        <h2 data-testid="header-player-name">{ playerInfo.player.name }</h2>
        <h2 data-testid="header-score">{ playerInfo.player.score}</h2>
      </header>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchScore: (score) => dispatch(scores(score)),
});

const mapStateToProps = (state) => ({
  email: state.login.email,
  name: state.login.name,
  score: state.getScore.score,
});

Header.propTypes = {
  dispatchScore: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
