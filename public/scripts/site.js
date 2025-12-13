
;(async() => {
    
    const { pathname } = window.location
    
    //if (pathname === '/' || pathname !== '') return

    const menuBox = document.querySelector('#menuItems')
    const eventBox = document.querySelector('#eventItems')
    
    if (!menuBox || !eventBox) return

    try {
        // fetch data from API
        const [menuRes, eventRes] = await Promise.all([
            fetch('/api/v1/menu'),
            fetch('/api/v1/events')
        ])

        const menuData = await menuRes.json()
        const eventData = await eventRes.json()

        // render menu
        menuBox.innerHTML = ''
        if (Array.isArray(menuData)) {
            menuData.forEach((item) => {
                const wrapper = document.createElement('article')
                wrapper.className = 'menuItems'

                const title = document.createElement('h3')
                title.textContent = item.name

                const desc = document.createElement('p')
                desc.textContent = item.description

                const price = document.createElement('p')
                price.textContent = `Price: $${item.price}`

                const img = document.createElement('img')
                img.src = item.url
                img.alt = item.name
                img.width = 300

                wrapper.append(title, desc, price, img)
                menuBox.appendChild(wrapper)
            })
        }else {
            menuBox.innerHTML = '<p>Could not load menu items.</p>'
        }

        // render events (name + date) w/ link to /event/:id
        eventBox.innerHTML = ''
        if (Array.isArray(eventData)) {
            eventData.forEach((item) => {
                const wrapper = document.createElement('article')
                wrapper.className = 'eventItems'

                const link = document.createElement('a')
                link.href = `/event/${item._id}`
                link.textContent = `${item.name} - ${item.date}`
                wrapper.appendChild(link)
                eventBox.appendChild(wrapper)
            })
        }else {
            eventBox.innerHTML = '<p>Could not load events.</p>'
        }
    }catch (err) {
        console.error('Failed to load data:', err)
        menuBox.innerHTML = '<p>Error loading menu</p>'
        eventBox.innerHTML = '<p>Error loading events</p>'
    }
})()