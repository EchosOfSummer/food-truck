;(async () => {
    // const urlParams = new URLSearchParams(window.location.search)
    // const eventId = urlParams.get('id')

    const path = window.location.pathname.split('/')
    const eventId = path[path.length - 1]

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

    // rabbit hole
    const randomImgs = [
        '/img/random01.jpeg',
        '/img/random02.jpeg',
        '/img/random03.jpeg',
        '/img/random04.jpeg',
        '/img/random05.jpeg',
        '/img/random06.jpeg',
        '/img/random07.jpeg',
        '/img/random08.jpeg',
        '/img/random09.jpeg',
        '/img/random10.jpeg',
    ]

    // // shuffle array
    // function shuffle(array) {
    //     const newArray = [...array]
    //     for (let i = newArray.length - 1; i > 0; i--) {
    //         const j = Math.floor(Math.random() * (i + 1));
    //         [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    //     }
    //     return newArray
    // }

    // render events
    eventBox.innerHTML = ''
    eventData.forEach((item, index) => {
        const wrapper = document.createElement('article')
        wrapper.className = 'eventItems'

        const link = document.createElement('a')
        link.href = `/event/${item._id}`
        link.textContent = `${item.name} - ${item.date}`

        // create carousel box
        const carouselBox = document.createElement('div')
        carouselBox.className = 'carouselBox'

        const carousel = document.createElement('div')
        carousel.className = 'carousel'
        carousel.id = `carousel-${index}`

        // const shuffledImgs = shuffle(randomImgs)
        // const selectedImgs = shuffledImgs.slice(0, 3)

        // selectedImgs.forEach((imgSrc, index) => {
        //     const img = document.createElement('img')
        //     img.src = imgSrc
        //     img.alt = `${item.name} image ${index + 1}`
        //     if (index === 0) img.classList.add('prev')
        //     if (index === 1) img.classList.add('active')
        //     if (index === 2) img.classList.add('next')
        //     carousel.appendChild(img)
        // })
        // create images elements
        for (let i = 0; i<3; i++) {
            const img = document.createElement('img')
            
            img.alt = `Event image ${i + 1}`
            carousel.appendChild(img)
        }

        // create buttons
        const btnDiv = document.createElement('div')
        btnDiv.className = 'carouselBtns'

        const prevBtn = document.createElement('button')
        prevBtn.textContent = 'Prev'
        prevBtn.className = 'carouselBtn'

        const nextBtn = document.createElement('button')
        nextBtn.textContent = 'Next'
        nextBtn.className = 'carouselBtn'

        btnDiv.appendChild(prevBtn)
        btnDiv.appendChild(nextBtn)

        carouselBox.appendChild(carousel)
        carouselBox.appendChild(btnDiv)

        wrapper.appendChild(link)
        wrapper.appendChild(carouselBox)
        eventBox.appendChild(wrapper)

        // carousel functionality
        const images = carousel.querySelectorAll('img')
        let currentImg = Math.floor(Math.random() * randomImgs.length)
        let autoRotate

        function updateCarousel() {
            images.forEach((img, index) => {
                img.classList.remove('prev', 'active', 'next')
                
                const imgIndex = ((index + currentImg) % randomImgs.length + randomImgs.length) % randomImgs.length
                img.src = randomImgs[imgIndex]

                if (index === 0) img.classList.add('prev')
                if (index === 1) img.classList.add('active')
                if ( index === 2) img.classList.add('next')
                
            })
        }

        function rotate() {
            currentImg++
            updateCarousel()
        }
        function startAuto() {
            autoRotate = setInterval(rotate, 3000)
        }
        function stopAuto() {
            clearInterval(autoRotate)
        }

        updateCarousel()
        startAuto()

        prevBtn.addEventListener('click', () => {
            stopAuto()
            currentImg--
            updateCarousel()
            startAuto()
        })
        nextBtn.addEventListener('click', () => {
            stopAuto()
            currentImg++
            updateCarousel()
            startAuto()
        })
    })

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

