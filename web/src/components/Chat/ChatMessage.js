import React from 'react';
import PropTypes from 'prop-types';

class ChatMessage extends React.Component {
  onMessageClick = event => {
    if (this.props.voted) return;
    this.props.onMessageClick(this.props.id);
  };

  render() {
    const classes = this.props.voted
      ? ['chat-message', 'voted', 'bg-primary']
      : ['chat-message'];
    return (
      <button
        className={classes.join(' ')}
        style={{
          top: this.props.posY + '%',
          left: this.props.posX + '%'
        }}
        onClick={this.onMessageClick}
      >
        {this.props.children}
      </button>
    );
  }
}

ChatMessage.propTypes = {
  id: PropTypes.number.isRequired,
  onMessageClick: PropTypes.func.isRequired,
  posX: PropTypes.number.isRequired,
  posY: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  voted: PropTypes.bool.isRequired
};

export default ChatMessage;
