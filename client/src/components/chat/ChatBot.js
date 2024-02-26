import React, { Component } from 'react';
import axios from 'axios';
import Message from './Message';
import Cards from '../chat/Cards'

export default class ChatBot extends Component {
  messagesEnd;
  constructor(props){
    super(props)
    this._handleInputKeyPress = this._handleInputKeyPress.bind(this);
    this.state={
      messages:[]
    }
  }
  
  async df_text_query(text){
    let says={
      speaks:"me",
      msg:{
        text:{
          text:text
        }
      }
    };
    this.setState({messages:[...this.state.messages,says]})
    const res=await axios.post('/api/df_text_query',{text});
    for(let msg of res.data.fulfillmentMessages){
      says={
        speaks:'bot',
        msg:msg
      }
      this.setState({messages:[...this.state.messages,says]});
    }
  }
  async df_event_query(event){
    const res=await axios.post('/api/df_event_query',{event});
    for(let msg of res.data.fulfillmentMessages){
      let says={
        speaks:'me',
        msg:msg
      }
       this.setState({messages:[...this.state.messages,says]});
    }

    
  }
  renderMessages(stateMessages){
    if(stateMessages){
      return stateMessages.map((message,i)=>{
        return this.renderOneMessage(message,i);
      });
    }
    else{
      return null;
    }
  }
  componentDidMount(){
    this.df_text_query(" i know javascript");
  }
  componentDidUpdate() {
        this.messagesEnd.scrollIntoView({ behavior: "smooth" });
    }
    renderCards(cards){
      return cards.map((cards,i)=><Cards key={i} payload={cards.structValue}/>)
    }
      renderOneMessage(message, i) {

        if (message.msg && message.msg.text && message.msg.text.text) {
            return <Message key={i} speaks={message.speaks} text={message.msg.text.text}/>;
        } else if (message.msg && message.msg.payload.fields.cards) { //message.msg.payload.fields.cards.listValue.values

            return <div key={i}>
                <div className="card-panel grey lighten-5 z-depth-1">
                    <div style={{overflow: 'hidden'}}>
                        <div className="col s2">
                            <a href="/" className="btn-floating btn-large waves-effect waves-light red">{message.speaks}</a>
                        </div>
                        <div style={{ overflow: 'auto', overflowY: 'scroll'}}>
                            <div style={{ height: 300, width:message.msg.payload.fields.cards.listValue.values.length * 270}}>
                                {this.renderCards(message.msg.payload.fields.cards.listValue.values)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        }
    }
    _handleInputKeyPress(e) {
        if (e.key === 'Enter') {
            this.df_text_query(e.target.value);
            e.target.value = '';
        }
    }
  render() {
    return (
      <div style={{height:500,width:400,position:'absolute',bottom:0,right:0, border: '1px soild lightgrey '}}>
        <nav>
          <div className='nav-wrapper'>
            <a className='brand-logo'>Hari</a>
          </div>
        </nav>
          <div style={{height:388,width:'100%',overflow:'scroll'}}>
         <div ref={(el) => { this.messagesEnd = el; }}
                         style={{ float:"left", clear: "both" }}>
                    </div>
          {this.renderMessages(this.state.messages)}
       </div>
       <div className='col s12'>
          <input style={{margin:0,paddingLeft:'1%',paddingRight:'1%',width:'90%'}} placeholder='Send a Message' type="text" onKeyPress={this._handleInputKeyPress}  />
 </div>
      </div>
    )
  }
}

