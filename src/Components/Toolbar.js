import React, { Component } from 'react';
import '../App.css';
import ComposeForm from './ComposeForm';

class Toolbar extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    totalUnread = () => {
        let total = 0;
        this.props.messages.map(message => {
            if (!message.read) {
                total++;
            }
        })
        return total;
    }

    render() {
        return (
            <>
                <div className='row toolbar'>
                    <div className='col-md-12'>
                        <p className='pull-right'>
                            <span className='badge badge'>{this.totalUnread()}</span>
                            unread messages
                        </p>
                        <a className={`btn btn-danger`} onClick={this.props.toggleComposeMessage}>
                            <i className={`fa ${this.props.showComposeMessage ? 'fa-minus' : 'fa-plus'}`}></i>
                        </a>

                        <button className={`btn btn-default`} onClick={(e) => {
                            this.props.selectAll()
                            this.props.checkedAmount()
                        }} >
                            <i className={`fa ${!this.props.allSelected ? (this.props.halfChecked ? 'fa-minus-square-o' : 'fa-square-o') : 'fa-check-square-o'}`} ></i>
                        </button>

                        <button className='btn btn-default' onClick={this.props.markMessagesRead}>Mark As Read</button>

                        <button className='btn btn-default' onClick={this.props.markMessagesUnread}>Mark As Unread</button>

                        <select className='form-control label-select' onChange={(e) => this.props.addLabels(e.target.value)}>
                            <option>Apply label</option>
                            <option value='dev'>dev</option>
                            <option value='personal'>personal</option>
                            <option value='gschool'>gschool</option>
                        </select>

                        <select className='form-control label-select' onChange={(e) => this.props.removeLabels(e.target.value)}>
                            <option>Remove label</option>
                            <option value='dev'>dev</option>
                            <option value='personal'>personal</option>
                            <option value='gschool'>gschool</option>
                        </select>

                        <button className='btn btn-default' onClick={(e) => this.props.deleteMessage()}>
                            <i className='fa fa-trash-o'></i>
                        </button>
                    </div>
                </div>
                <div className={this.props.showComposeMessage ? '' : 'hidden'}>
                    <ComposeForm composeMessage={this.props.composeMessage} />
                </div>
            </>
        );
    }
}

export default Toolbar;
