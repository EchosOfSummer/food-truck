;(async () => {
    const path = window.location.pathname.split('/')
    const menuId = path[path.length - 1]

    if (!menuId) {
        document.querySelector('#menuItem').innerHTML = '<p>No menu item selected.</p>'
        return
    }

    const res = await fetch(`/api/v1/menu/${menuId}`)
    const menuData = await res.json()

    if (menuData.error) {
        document.querySelector('#menuItem').innerHTML = `<p>${menuData.error.message}</p>`
        return
    }

    document.querySelector('#menuName').textContent = menuData.name
    document.querySelector('#menuDescription').textContent = menuData.description
    document.querySelector('#menuPrice').textContent = `Price: $${menuData.price}`
    const img = document.querySelector('#menuImage')
    img.src = menuData.url
    img.alt = menuData.name
    img.style.display = 'block'
})()