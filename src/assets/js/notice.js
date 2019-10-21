import { Message, Notification, MessageBox } from 'element-ui'

export const notice = (content, type = 'warning', noticetype = 'message') => {
  let options = {
    message: content,
    type: type,
    duration: 3000,
    showClose: true
  }
  if (noticetype === 'message') {
    Message(options)
  }
  if (noticetype === 'Notification') {
    Notification(options)
  }
  if (noticetype === 'MessageBox') {
    MessageBox(options)
  }
}
