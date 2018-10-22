import React, { Component } from 'react';
import './App.css';


class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            starred: this.props.message.starred,
        }
    }

    render() {
        return (
            <>
                {
                    <div className={`row message ${this.props.readStatus ? 'read' : 'unread'} 
                        ${this.props.message.selected ? 'selected' : ''}`}>
                        <div className="col-xs-1">
                            <div className="row">
                                <div className="col-xs-2">
                                    <input type="checkbox" checked={this.props.isSelected ? 'checked' : false}
                                        onClick={(e) => this.props.selectOneMessage(this.props.message.id)}
                                    />
                                </div>
                                <div className="col-xs-2">
                                    <i className={`star fa ${this.state.starred ? 'fa-star' : 'fa-star-o'}`}
                                        onClick={(e) => {
                                            this.setState({ starred: !this.state.starred })
                                        }}></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-11">
                            <span className={`label label-warning ${this.props.message.labels.includes('dev') ? '' : 'hidden'}`}>dev</span>
                            <span className={`label label-warning ${this.props.message.labels.includes('personal') ? '' : 'hidden'}`}>personal</span>
                            <span className={`label label-warning ${this.props.message.labels.includes('gschool') ? '' : 'hidden'}`}>gschool</span>
                            <a className=""
                                // onClick={(e) => this.setState({ read: true, })}
                                onClick={(e) => this.props.messageWasClicked(this.props.message.id)}
                                href="#" > {this.props.subject}</a>
                        </div >
                    </div >
                }
            </>
        )
    }
}

export default Messages;