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
            <>
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
                            {/* <span className={`label label-warning ${this.props.label.personal ? '' : 'hidden'}`}>dev</span>
                            <span className={`label label-warning ${this.props.label.personal ? '' : 'hidden'}`}>personal</span>
                            <span className={`label label-warning ${this.props.label.personal ? '' : 'hidden'}`}>gschool</span> */}
                            <a className="" onClick={() => this.props.toggleRead(this.props.readStatus)} href="#"> {this.props.subject}</a>
                        </div >
                    </div >
                }
            </>
        )
    }
}

export default Messages;

//add this to message componenent
// <div class="row message read">
//   <div class="col-xs-1">
//     <div class="row">
//       <div class="col-xs-2">
//         <input type="checkbox" />
//       </div>
//       <div class="col-xs-2">
//         <i class="star fa fa-star"></i>
//       </div>
//     </div>
//   </div>
//   <div class="col-xs-11">
//     <span class="label label-warning">dev</span>
//     <span class="label label-warning">gschool</span>
//     <a href="#">
//       Here is some message text that has a bunch of stuff
//     </a>
//   </div>
// </div>

// <div class="row message-body">
//   <div class="col-xs-11 col-xs-offset-1">
//     This is the body of the message.
//   </div>
// </div>