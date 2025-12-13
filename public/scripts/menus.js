;(async () => {
    const menuBox = document.querySelector('#menuItems')

    if (!menuBox) return

    try {
        const menuRes = await fetch('/api/v1/menu')
        const menuData = await menuRes.json()

        menuBox.innerHTML = ''
        
        if (Array.isArray(menuData)) {
            menuData.forEach((item, index) => {
                const wrapper = document.createElement('article')
                wrapper.classList.add('menuItems')

                const link = document.createElement('a')
                link.href = `/menu/${item._id}`
                link.textContent = `${item.name} - ${item.price}`

                wrapper.appendChild(link)
                menuBox.appendChild(wrapper)
            })
        }else {
            menuBox.innerHTML = '<p>Could not load menu items.</p>'
        }
    
    }catch (err) {
        console.error('Failed to load menu:', err)
        menuBox.innerHTML = '<p>Error loading menu.</p>'
    }
})()