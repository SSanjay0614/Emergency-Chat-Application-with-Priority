import React from 'react'
import './Message.css'
import ReactEmoji from 'react-emoji'

const Message = ({ message: { text, user, priority }, name }) => {
  let isSentByCurrentUser = false

  const trimmedName = name.trim().toLowerCase()

  if (user === trimmedName) {
    isSentByCurrentUser = true
  }

  const messageClass = `messageBox ${priority === 'urgent' ? 'urgent' : priority === 'high' ? 'high' : 'normal'}`

  return isSentByCurrentUser ? (
    <div className='messageContainer justifyEnd'>
      <p className='sentText pr-10'>{trimmedName}</p>
      <div className={`${messageClass} backgroundBlue`}>
        <p className='messageText colorWhite'>{ReactEmoji.emojify(text)}</p>
      </div>
    </div>
  ) : (
    <div className='messageContainer justifyStart'>
      <div className={`${messageClass} backgroundLight`}>
        <p className='messageText colorDark'>{ReactEmoji.emojify(text)}</p>
      </div>
      <p className='sentText pl-10'>{user}</p>
    </div>
  )
}

export default Message
