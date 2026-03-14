const navBtn = document.querySelector('.burger-btn')
const navList = document.querySelector('.nav-list')
const nav = document.querySelector('.nav')
const navElement = document.querySelector('.nav')
const allNavItems = document.querySelectorAll('.nav-item')
const navLinks = navList ? navList.querySelectorAll('a') : []

const btn = document.getElementById('toggleProjects')
const more = document.getElementById('projectsMore')

const handleNav = () => {
	const isActive = nav.classList.contains('nav-active')
	nav.classList.toggle('nav-active')

	if (!isActive) {
		setTimeout(() => {
			const firstLink = navList.querySelector('a')
			if (firstLink) firstLink.focus()
		}, 100)
		document.addEventListener('keydown', handleTabTrap)
	} else {
		document.removeEventListener('keydown', handleTabTrap)
		navBtn.focus()
	}

	allNavItems.forEach(item => {
		item.addEventListener('click', () => {
			nav.classList.remove('nav-active')
			document.removeEventListener('keydown', handleTabTrap)
		})
	})
}

const handleTabTrap = (e) => {
	if (e.key !== 'Tab') return
	
	const isNavActive = nav.classList.contains('nav-active')
	if (!isNavActive) {
		document.removeEventListener('keydown', handleTabTrap)
		return
	}

	const firstLink = navList.querySelector('a')
	const lastLink = navList.querySelector('a:last-child')

	if (e.shiftKey && document.activeElement === firstLink) {
		e.preventDefault()
		lastLink.focus()
	} else if (!e.shiftKey && document.activeElement === lastLink) {
		e.preventDefault()
		firstLink.focus()
	}
}

navBtn.addEventListener('click', handleNav)

function slideDown(el, duration = 350) {
	el.hidden = false
	el.style.height = '0px'
	el.style.overflow = 'hidden'

	const targetHeight = el.scrollHeight

	el.style.transition = `height ${duration}ms ease`
	requestAnimationFrame(() => {
		el.style.height = targetHeight + 'px'
	})

	el.addEventListener('transitionend', function handler() {
		el.style.height = 'auto'
		el.style.transition = ''
		el.style.overflow = ''
		el.removeEventListener('transitionend', handler)
	})
}

function slideUp(el, duration = 350) {
	el.style.height = el.scrollHeight + 'px'
	el.style.overflow = 'hidden'

	requestAnimationFrame(() => {
		el.style.transition = `height ${duration}ms ease`
		el.style.height = '0px'
	})

	el.addEventListener('transitionend', function handler() {
		el.hidden = true
		el.style.height = ''
		el.style.transition = ''
		el.style.overflow = ''
		el.removeEventListener('transitionend', handler)
	})
}

btn.addEventListener('click', () => {
	const isOpen = btn.getAttribute('aria-expanded') === 'true'

	if (!isOpen) {
		slideDown(more)
		btn.setAttribute('aria-expanded', 'true')
		btn.textContent = 'Skjul'
	} else {
		slideUp(more)
		btn.setAttribute('aria-expanded', 'false')
		btn.textContent = 'Se alle prosjekter'
	}
})

document.getElementById('year').textContent = new Date().getFullYear()
