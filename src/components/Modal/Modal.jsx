import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDowm);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDowm);
  }

  handleKeyDowm = e => {
    if (e.code === 'Escape') {
      this.props.closeModal();
    }
  };

  handleClick = e => {
    if (e.target === e.currentTarget) {
      this.props.closeModal();
    }
  };

  render() {
    return (
      <div className={css.overlay} onClick={this.handleClick}>
        <div className={css.modal}>
          <img src={this.props.largeimageurl} alt="" />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
    closeModal: PropTypes.func.isRequired,
}