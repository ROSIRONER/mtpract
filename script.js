const overlay = document.getElementById('overlay')
const appointmentModal = document.getElementById('appointmentModal')
const doctorModal = document.getElementById('doctorModal')
const blogModal = document.getElementById('blogModal')
const doctorName = document.getElementById('doctorName')

const openAppointmentButtons = [
  document.getElementById('openAppointmentTop'),
  document.getElementById('openAppointmentHero'),
  document.getElementById('doctorAppointmentBtn')
]

function openModal(modal) {
  appointmentModal.classList.remove('open')
  doctorModal.classList.remove('open')
  blogModal.classList.remove('open')
  overlay.classList.add('open')
  modal.classList.add('open')
}

function closeModals() {
  overlay.classList.remove('open')
  appointmentModal.classList.remove('open')
  doctorModal.classList.remove('open')
  blogModal.classList.remove('open')
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

const appointmentForm = document.getElementById('appointmentForm')
const patientName = document.getElementById('patientName')
const patientPhone = document.getElementById('patientPhone')
const patientDirection = document.getElementById('patientDirection')
const patientDate = document.getElementById('patientDate')
const formMessage = document.getElementById('formMessage')

const today = new Date().toISOString().split('T')[0]
patientDate.min = today

function isValidPhone(phone) {
  const clean = phone.replace(/\D/g, '')
  return clean.length >= 11
}

appointmentForm.addEventListener('submit', event => {
  event.preventDefault()
  formMessage.classList.remove('success')
  if (patientName.value.trim().length < 2) {
    formMessage.textContent = 'Введите корректное имя'
    return
  }
  if (!isValidPhone(patientPhone.value)) {
    formMessage.textContent = 'Введите корректный номер телефона'
    return
  }
  if (!patientDirection.value) {
    formMessage.textContent = 'Выберите направление'
    return
  }
  if (!patientDate.value) {
    formMessage.textContent = 'Выберите дату приёма'
    return
  }
  formMessage.textContent = 'Заявка отправлена. Мы свяжемся с вами в ближайшее время.'
  formMessage.classList.add('success')
  setTimeout(() => {
    closeModals()
    appointmentForm.reset()
    patientDate.min = today
    formMessage.textContent = ''
    formMessage.classList.remove('success')
  }, 700)
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

const blogArticles = {
  cardio: {
    image: 'https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?auto=format&fit=crop&w=1400&q=80',
    tag: 'Кардиология',
    title: 'Кардиолог за 5 минут: что важно знать о давлении',
    meta: ['Петров Дмитрий Владимирович', '10 января 2026', '5 мин'],
    lead: 'Артериальное давление — один из главных показателей здоровья. Нормой у большинства взрослых считается диапазон около 120/80, но важна не одна цифра, а динамика.',
    list: [
      'Измеряйте давление в спокойном состоянии, после 5 минут отдыха.',
      'Записывайте утренние и вечерние показатели 7 дней подряд.',
      'Обратитесь к врачу, если давление регулярно выше 140/90 или ниже 90/60.'
    ]
  },
  pedi: {
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=80',
    tag: 'Педиатрия',
    title: 'Мифы о детском здоровье: развенчиваем заблуждения',
    meta: ['Сидорова Елена Викторовна', '12 января 2026', '7 мин'],
    lead: 'Вокруг детского здоровья много мифов. Важно опираться на доказательную медицину и индивидуальные рекомендации вашего педиатра.',
    list: [
      'Температуру до 38,5 не всегда нужно сбивать сразу, если ребёнок активен.',
      'Антибиотики не лечат вирусные инфекции и назначаются только врачом.',
      'Профилактические осмотры помогают выявить проблемы на раннем этапе.'
    ]
  },
  neuro: {
    image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&w=1400&q=80',
    tag: 'Неврология',
    title: 'Головная боль: когда пора к врачу?',
    meta: ['Николаев Сергей Андреевич', '15 января 2026', '6 мин'],
    lead: 'Большинство головных болей неопасны, но есть признаки, когда откладывать визит нельзя. Особенно если боль необычная или резко усиливается.',
    list: [
      'Срочно обратитесь за помощью при внезапной сильной боли «как удар».',
      'Если боль сопровождается онемением, нарушением речи или зрения — нужна срочная диагностика.',
      'При частых приступах ведите дневник и покажите его неврологу.'
    ]
  }
}

const blogModalImage = document.getElementById('blogModalImage')
const blogModalTag = document.getElementById('blogModalTag')
const blogModalTitle = document.getElementById('blogModalTitle')
const blogModalMeta = document.getElementById('blogModalMeta')
const blogModalLead = document.getElementById('blogModalLead')
const blogModalList = document.getElementById('blogModalList')

function openBlogArticle(key) {
  const article = blogArticles[key]
  if (!article) return
  blogModalImage.src = article.image
  blogModalTag.textContent = article.tag
  blogModalTitle.textContent = article.title
  blogModalMeta.innerHTML = article.meta.map(item => `<span>${item}</span>`).join('')
  blogModalLead.textContent = article.lead
  blogModalList.innerHTML = article.list.map(item => `<li>${item}</li>`).join('')
  openModal(blogModal)
}

document.querySelectorAll('.blog-open').forEach(button => {
  button.addEventListener('click', () => openBlogArticle(button.dataset.article))
})
