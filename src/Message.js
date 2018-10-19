import React, { Component } from 'react';
import './App.css';


class Messages extends Component {
    constructor(props) {
        super(props)
        this.state = {
            checked: this.props.message.checked,
            starred: this.props.message.starred,
            read: this.props.readStatus
        }
    }

    render() {
        return (
            <>
                {
                    <div className={`row message ${this.state.read ? 'read' : 'unread'} 
                        ${this.state.checked || this.props.allSelected ? 'selected' : ''}`}>
                        <div className="col-xs-1">
                            <div className="row">
                                <div className="col-xs-2">
                                    <input type="checkbox" checked={this.props.allSelected || this.props.isChecked ? 'checked' : false}
                                        onClick={(e) => this.setState(this.props.isChecked: !this.props.isChecked })
                                } />
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
                            <a className="" onClick={(e) => this.setState({ read: true, })}
                                href="#" > {this.props.subject}</a>
                        </div >
                    </div >
                }
            </>
        )
    }
}

export default Messages;