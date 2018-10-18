import React, { Component } from 'react';
import './App.css';
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
                        toggleRead={this.props.toggleRead} />
                })
                }
            </div>
        )

        //         < Message messages = { this.props.messages }
        //     toggleClass = { this.props.toggleClass }
        //     toggleSelected = { this.props.toggleSelected }
        //     toggleRead = { this.props.toggleRead }
        //     read = { this.props.read }
        //     checked = { this.state.checked } />
        //     );
        // 
    }
}

export default Messages;
