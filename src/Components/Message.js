import React, { Component } from 'react';
import '../App.css';


class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            opened: false
        }
    }

    render() {
        return (
            <>
                <div className={`row message ${this.props.readStatus ? 'read' : 'unread'} 
                        ${this.props.message.selected ? 'selected' : ''}`}>
                    <div className='col-xs-1'>
                        <div className='row'>
                            <div className='col-xs-2'>
                                <input type='checkbox' checked={this.props.isSelected ? 'checked' : false}
                                    onClick={(e) => {
                                        this.props.selectOneMessage(this.props.message.id)
                                    }}
                                />
                            </div>
                            <div className='col-xs-2'>
                                <i className={`star fa ${this.props.message.starred ? 'fa-star' : 'fa-star-o'}`}
                                    onClick={(e) => {
                                        this.props.starClick(this.props.message.id)
                                    }}></i>
                            </div>
                        </div>
                    </div>
                    <div className='col-xs-11'>
                        <span className={`label label-warning ${this.props.message.labels.includes('dev') ? '' : 'hidden'}`}>dev</span>
                        <span className={`label label-warning ${this.props.message.labels.includes('personal') ? '' : 'hidden'}`}>personal</span>
                        <span className={`label label-warning ${this.props.message.labels.includes('gschool') ? '' : 'hidden'}`}>gschool</span>
                        <a className=''
                            onClick={(e) => {
                                this.props.messageWasClicked(this.props.message.id)
                                this.setState({ opened: !this.state.opened })
                            }} href='#' > {this.props.subject}</a>
                    </div >
                </div>
                <div className={`row message-body ${this.state.opened ? '' : 'hidden'}`}>
                    <div className='col-xs-11 col-xs-offset-1'>
                        {this.props.message.body}
                    </div>
                </div>
            </>
        )
    }
}

export default Messages;