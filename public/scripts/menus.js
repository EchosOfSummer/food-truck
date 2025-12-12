;(async () => {
    const menuBox = document.querySelector('#menuItems')

    if (!menuBox) return

    const menuRes = await fetch('/api/v1/menu')
    const menuData = await menuRes.json()

    menuBox.innerHTML = ''
    menuData.forEach((item, index) => {
        const wrapper = document.createElement('article')
        wrapper.classList.add('menuItems')

        const link = document.createElement('a')
        link.href = `/menu/${item._id}`
        link.textContent = `${item.name} - ${item.price}`

        wrapper.appendChild(link)
        menuBox.appendChild(wrapper)
    })

})()