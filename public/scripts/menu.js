;(async () => {
    const path = window.location.pathname.split('/')
    const menuId = path[path.length - 1]

    if (!menuId) {
        document.querySelector('#menuItem').innerHTML = '<p>No menu item selected.</p>'
        return
    }

    const res = await fetch(`/api/v1/events/${menuId}`)
    const menuData = await res.json()

    if (menuData.error) {
        document.querySelector('#menuItem').innerHTML = `<p>${menuData.error.message}</p>`
    }

    document.querySelector('#menuName').textContent = menuData.name
    document.querySelector('#menuDescription').textContent = `Date: ${menuData.date}`
    document.querySelector('#menuPrice').textContent = `Time: ${menuData.time}`
})()