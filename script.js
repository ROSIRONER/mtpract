const overlay = document.getElementById('overlay')
const appointmentModal = document.getElementById('appointmentModal')
const doctorModal = document.getElementById('doctorModal')
const doctorName = document.getElementById('doctorName')

const openAppointmentButtons = [
  document.getElementById('openAppointmentTop'),
  document.getElementById('openAppointmentHero'),
  document.getElementById('doctorAppointmentBtn')
]

function openModal(modal) {
  overlay.classList.add('open')
  modal.classList.add('open')
}

function closeModals() {
  overlay.classList.remove('open')
  appointmentModal.classList.remove('open')
  doctorModal.classList.remove('open')
}

openAppointmentButtons.forEach(button => {
  button.addEventListener('click', () => openModal(appointmentModal))
})

document.querySelectorAll('.doctor-btn').forEach(button => {
  button.addEventListener('click', () => {
    doctorName.textContent = button.dataset.doctor
    openModal(doctorModal)
  })
})

document.querySelectorAll('[data-close]').forEach(button => {
  button.addEventListener('click', closeModals)
})

overlay.addEventListener('click', closeModals)

document.getElementById('appointmentForm').addEventListener('submit', event => {
  event.preventDefault()
  alert('Заявка отправлена. Мы свяжемся с вами в ближайшее время.')
  closeModals()
  event.target.reset()
})

const chat = document.getElementById('chat')
const chatToggle = document.getElementById('chatToggle')
const chatClose = document.getElementById('chatClose')
const chatForm = document.getElementById('chatForm')
const chatText = document.getElementById('chatText')
const chatBody = document.getElementById('chatBody')

chatToggle.addEventListener('click', () => {
  chat.style.display = 'block'
  chatToggle.style.display = 'none'
})

chatClose.addEventListener('click', () => {
  chat.style.display = 'none'
  chatToggle.style.display = 'block'
})

function addMessage(text, isMe = false) {
  const message = document.createElement('div')
  message.className = isMe ? 'message me' : 'message'
  message.textContent = text
  chatBody.appendChild(message)
  chatBody.scrollTop = chatBody.scrollHeight
}

function botReply(text) {
  const lower = text.toLowerCase()
  if (lower.includes('цены')) return 'Базовые цены есть в разделе «Наши цены». Также могу открыть форму записи прямо сейчас.'
  if (lower.includes('часы') || lower.includes('график')) return 'Мы работаем: Пн-Пт 8:00-21:00, Сб-Вс 9:00-18:00.'
  if (lower.includes('контакт')) return 'Адрес: г. Москва, ул. Тверская, д. 15. Телефон: +7 (495) 123-45-67.'
  if (lower.includes('запис')) {
    openModal(appointmentModal)
    return 'Открываю форму записи. Заполните имя, телефон и направление.'
  }
  return 'Я понял запрос. Могу подсказать цены, часы работы, контакты и помочь записаться на приём.'
}

chatForm.addEventListener('submit', event => {
  event.preventDefault()
  const text = chatText.value.trim()
  if (!text) return
  addMessage(text, true)
  chatText.value = ''
  setTimeout(() => addMessage(botReply(text)), 400)
})

document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const text = chip.textContent
    addMessage(text, true)
    setTimeout(() => addMessage(botReply(text)), 300)
  })
})
