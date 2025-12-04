;(async () => {
    const { pathname } = window.location
    const parts = pathname.split('/')
    const [, searchType, id ] = parts

    //if (searchType !== 'event' || !id) return

    const res = await fetch(`/api/v1/events/${id}`)
    const { name, location, date, time } = await res.json()

    const nameEl = document.querySelector('#eventName')
    const locationEl = document.querySelector('#eventLocation')
    const dateEl = document.querySelector('#eventDate')
    const timeEl = document.querySelector('#eventTime')

    if (nameEl) nameEl.textContent = name
    if (locationEl) locationEl.textContent = `Location: ${location || ''}` 
    if (dateEl) dateEl.textContent = `Date: ${date || ''}`
    if (timeEl) timeEl.textContent = `Time: ${time || ''}`
})()

