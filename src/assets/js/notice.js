import { Message, Notification, MessageBox } from 'element-ui'

export const notice = (content, type = 'info') => {
  let options = {
    message: content,
    type: type,
    duration: 2000,
    showClose: true
  }
  switch (type) {
    case 'success':
      Message(options)
      break
    case 'info':
      Notification(options)
      break
    case 'warning':
      Message.warning(content, options)
      break
    case 'error':
      options.showConfirmButton = true
      MessageBox.alert(content, '错误', options)
      break
  }
}
