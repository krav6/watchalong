import React from 'react';
import { connect } from 'react-redux';
import { setInterval } from 'timers';

import './Chat.css';
import * as chatActions from 'store/actions/chat';
import ChatMessage from 'components/Chat/ChatMessage';
import ChatControls from 'components/Chat/ChatControls';
import ChatInput from 'components/Chat/ChatInput';

export class Chat extends React.Component {
  state = {
    inputMessage: '',
    isPlaying: false,
    intervalId: null,
    time: 0,
    videoLength: 120
  };

  componentDidMount() {
    this.props.fetchMediaInfo(
      this.props.match.params.id,
      this.props.match.params.type
    );
    this.props.loadMessages(this.state.time);
  }

  getTime = () => {
    return (
      ('0' + Math.floor(this.state.time / 60)).slice(-2) +
      ':' +
      ('0' + this.state.time % 60).slice(-2)
    );
  };

  onFormChange = event => {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value
    });
  };

  incrementTime = () => {
    this.setState(prevState => ({
      ...prevState,
      time: +prevState.time + 1
    }));
  };

  togglePlay = () => {
    if (this.state.isPlaying) {
      clearInterval(this.state.intervalId);
      this.setState(prevState => ({
        ...prevState,
        intervalId: null,
        isPlaying: false
      }));
    } else {
      const intervalId = setInterval(this.incrementTime, 1000);
      this.setState(prevState => ({
        ...prevState,
        intervalId: intervalId._id,
        isPlaying: true
      }));
    }
  };

  isInsideInterval = time => {
    return +time >= +this.state.time - 10 && +time <= +this.state.time + 10;
  };

  render() {
    return (
      <div className="chat-main position-relative">
        <div
          className="chat-backdrop"
          style={{
            background:
              "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 1)), url('/poster.jpg') top center no-repeat"
          }}
        />
        <h3 className="chat-header bg-primary p-3 mb-0">{this.props.name}</h3>
        <div className="chat-area">
          {this.props.isLoading && (
            <div className="alert alert-info">Loading...</div>
          )}
          <div>
            {this.props.messages.map((val, idx) => {
              if (this.isInsideInterval(val.time)) {
                return (
                  <ChatMessage
                    id={val.id}
                    onMessageClick={this.props.onMessageClick}
                    posX={50 - (+this.state.time - val.time) * 10}
                    posY={(idx % 9.5) * 10}
                    score={val.score}
                    key={val.id}
                    voted={val.voted}
                  >
                    {val.text}
                  </ChatMessage>
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
        <div className="chat-controls shadow">
          <ChatControls
            displayTime={this.getTime()}
            isPlaying={this.state.isPlaying}
            onFormChange={this.onFormChange}
            time={+this.state.time}
            togglePlay={this.togglePlay}
            videoLength={this.state.videoLength}
          />
          <ChatInput
            inputMessage={this.state.inputMessage}
            onFormChange={this.onFormChange}
            onFormSubmit={event => {
              event.preventDefault();
              this.props.onMessageSubmit(
                this.state.id,
                this.state.type,
                this.state.inputMessage,
                this.state.time
              );
              this.setState(prevState => ({
                ...prevState,
                inputMessage: ''
              }));
            }}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isLoading: state.chat.isLoading,
  mediaId: state.chat.id,
  mediaType: state.chat.type,
  messages: state.chat.messages,
  name: state.chat.name,
  videoLength: state.chat.videoLength
});

const mapDispatchToProps = dispatch => ({
  fetchMediaInfo: (id, type) => dispatch(chatActions.fetchMediaInfo(id, type)),
  loadMessages: time => dispatch(chatActions.loadMessages(time)),
  onMessageClick: id => dispatch(chatActions.setVoted(id)),
  onMessageSubmit: (id, type, text, time) =>
    dispatch(chatActions.sendMessage(id, type, text, time))
});

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
