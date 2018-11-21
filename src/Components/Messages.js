import React, { Component } from 'react';
import '../App.css';
import Message from './Message'

class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <div>
                {this.props.messages.map(message => {
                    return <Message readStatus={message.read}
                        subject={message.subject}
                        message={message}
                        allSelected={this.props.allSelected}
                        isSelected={message.selected}
                        selectOneMessage={this.props.selectOneMessage}
                        messageWasClicked={this.props.messageWasClicked}
                        checkedAmount={this.props.checkedAmount}
                        starClick={this.props.starClick} />
                })
                }
            </div>
        )
    }
}

export default Messages;
