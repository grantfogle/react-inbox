import React, { Component } from 'react';
import './App.css';


class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: false
        }
    }

    render() {
        return (
            <div>
                {
                    <div className={`row message ${this.props.readStatus ? 'read' : 'unread'} ${this.props.checked ? 'selected' : ''}`}>
                        <div className="col-xs-1">
                            <div className="row">
                                <div className="col-xs-2">
                                    <input type="checkbox" onClick={() => this.props.toggleSelected(this.props.message)} />
                                </div>
                                <div className="col-xs-2">
                                    <i className="star fa fa-star-o" ></i>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-11">
                            <a className="" onClick={() => this.props.toggleRead(this.props.readStatus)}
                                href="#"> {this.props.subject}</a>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

export default Messages;
