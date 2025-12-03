










// (async () => {
//     const { pathname } = window.location
//     const [, searchType, id ] = pathname.split('/')
    
//     const url = (() => {
//         if (searchType === 'event') return `/api/v1/food-truck/events/${id}`
//     })()

//     const result = await fetch(url)
//     const { name, location, date, time } = await result.json()

//     document.getElementById("event-details-name").textContent = "Name: " + name
//     document.getElementById("event-details-location").textContent = "Location: " + location
//     document.getElementById("event-details-date").textContent = "Date: " + date
//     document.getElementById("event-details-time").textContent = "Time: " + time
// })()