
;(function() {
    const { pathname } = window.location

    //if (!pathname.startsWith('/admin')) return

    const addItem = document.getElementById('addItem')
    const addEvent = document.getElementById('addEvent')
    const menuAdded = document.getElementById('menuAdded')

    // handle add menu item form
    if (addItem) {
        addItem.addEventListener('submit', async (e) => {
            e.preventDefault()

            const newMenuItem = {
                name: document.getElementById('menuName').value,
                description: document.getElementById('menuDescription').value,
                price: document.getElementById('menuPrice').value,
                url: document.getElementById('menuUrl').value
            }

            const res = await fetch('/api/v1/menu',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newMenuItem)
            })

            const json = await res.json()
            console.log('Menu item added: ', json)

            if (menuAdded) {
                menuAdded.textContent = `Menu item "${newMenuItem.name}" added!`
            }

            addItem.reset()
        })
    }

    // handle add menu item form
    if (addEvent) {
        addEvent.addEventListener('submit', async (e) => {
            e.preventDefault()

            const newEvent = {
                name: document.getElementById('eventName').value,
                location: document.getElementById('eventLocation').value,
                date: document.getElementById('eventDate').value,
                time: document.getElementById('eventTime').value
            }

            const res = await fetch('/api/v1/events',{
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newEvent)
            })

            const json = await res.json()
            console.log('Event created: ', json)

            addEvent.reset()
        })
    }
})()

