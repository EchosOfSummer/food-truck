;(async () => {
    const urlParams = new URLSearchParams(window.location.search)
    const eventId = urlParams.get('id')

    // const path = window.location.pathname.split('/')
    // const eventId = path[path.length - 1]

    if (!eventId) {
        document.querySelector('#event').innerHTML = '<p>No event selected.</p>'
        return
    }

    const res = await fetch(`/api/v1/events/${eventId}`)
    const eventData = await res.json()

    if (eventData.error) {
        document.querySelector('#event').innerHTML = `<p>${eventData.error.message}</p>`
    }

    document.querySelector('#eventName').textContent = eventData.name
    document.querySelector('#eventLocation').textContent = `Location: ${eventData.location}`
    document.querySelector('#eventDate').textContent = `Date: ${eventData.date}`
    document.querySelector('#eventTime').textContent = `Time: ${eventData.time}`

    // const { pathname } = window.location
    // const parts = pathname.split('/')
    // const [, searchType, id ] = parts

    // //if (searchType !== 'event' || !id) return

    // const res = await fetch(`/api/v1/events/${id}`)
    // const { name, location, date, time } = await res.json()

    // const nameEl = document.querySelector('#eventName')
    // const locationEl = document.querySelector('#eventLocation')
    // const dateEl = document.querySelector('#eventDate')
    // const timeEl = document.querySelector('#eventTime')

    // if (nameEl) nameEl.textContent = name
    // if (locationEl) locationEl.textContent = `Location: ${location || ''}` 
    // if (dateEl) dateEl.textContent = `Date: ${date || ''}`
    // if (timeEl) timeEl.textContent = `Time: ${time || ''}`
})()

