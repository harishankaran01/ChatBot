import React from 'react'

export default function Cards(props) {
  return (
    <div style={{width:270, paddingRight:30,float:'left'}}>
        <div class="card">
        <div class="card-image" style={{width:240}}>
          <img alt={props.payload.fields.header.stringValue} src={props.payload.fields.image.stringValue} />
          <span class="card-title">{props.payload.fields.header.stringValue}</span>
        </div>
        <div class="card-content">
         {props.payload.fields.description.stringValue}
         <p><a>{props.payload.fields.price.stringValue}</a></p>
        </div>
        <div class="card-action">
          <a target='_blank'rel='noopener noreferrer' href={props.payload.fields.link.stringValue}>Get Now</a>
        </div>
      </div>
    </div>
  )
}
