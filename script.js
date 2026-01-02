const list = document.querySelector('.list')
const empty = document.querySelector('.empty')
const addBtn = document.querySelector('.add-btn')
const modal = document.querySelector('.modal-bg')
const apply = document.querySelector('.apply')
const cancel = document.querySelector('.cancel')
const input = document.querySelector('.note-input')
const searchInput = document.querySelector('.search-input')
const searchImg = document.querySelector('.search-img')
const filter = document.querySelector('.filter')
const themeBtn = document.querySelector('.theme-btn')

let notes = JSON.parse(localStorage.getItem('notes')) || []
let savedTheme = localStorage.getItem('theme')

if (savedTheme === 'dark') {
  document.body.classList.add('dark')
  searchImg.src = 'assets/photos/Search.png'
}

function save() {
  localStorage.setItem('notes', JSON.stringify(notes))
}

function render() {
  list.innerHTML = ''
  const q = searchInput.value.toLowerCase()
  const f = filter.value

  const filtered = notes.filter(n => {
    if (!n.text.toLowerCase().includes(q)) return false
    if (f === 'complete') return n.done
    if (f === 'incomplete') return !n.done
    return true
  })

  empty.style.display = filtered.length ? 'none' : 'block'

  filtered.forEach((n) => {
    const item = document.createElement('div')
    item.className = 'item'

    const left = document.createElement('div')
    left.className = 'left'

    const cb = document.createElement('div')
    cb.className = 'checkbox' + (n.done ? ' checked' : '')
    cb.onclick = () => {
      n.done = !n.done
      save()
      render()
    }

    const text = document.createElement('div')
    text.className = 'text' + (n.done ? ' done' : '')
    text.textContent = n.text

    const options = document.createElement('img')
    options.src = 'assets/photos/Options.png'
    options.style.cursor = 'pointer'

    left.append(cb, text)
    item.append(left, options)
    list.append(item)
  })
}

addBtn.onclick = () => modal.style.display = 'flex'
cancel.onclick = () => modal.style.display = 'none'

apply.onclick = () => {
  if (!input.value.trim()) return
  notes.push({ text: input.value, done: false })
  input.value = ''
  save()
  render()
  modal.style.display = 'none'
}

searchInput.oninput = render
filter.onchange = render

themeBtn.onclick = () => {
  const dark = document.body.classList.toggle('dark')
  localStorage.setItem('theme', dark ? 'dark' : 'light')
  searchImg.src = dark
    ? 'assets/photos/Search.png'
    : 'assets/photos/SearchDark.png'
}

render()
