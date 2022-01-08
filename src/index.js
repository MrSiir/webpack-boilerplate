import template from '@/index.hbs'
import 'Styles/app.scss'

const options = {
  message: 'Hola Mundo!'
}

document.body.innerHTML = template(options)
