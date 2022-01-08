import template from '@/about.hbs'
import 'Styles/app.scss'

console.log(template)

document.body.innerHTML = template()
