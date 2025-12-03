


// // add new menu items
// (async () => {
//     // menu
//     document.getElementById('add-menu-item').addEventListener('submit', async (e) => {
//         e.preventDefault() // prevents page from not showing error
//         const newMenuItem = {
//             name: document.getElementById('menu-item-name').value, 
//             description: document.getElementById('menu-item-description').value, 
//             price: document.getElementById('menu-item-price').value, 
//             url: document.getElementById('menu-item-url').value
//         }
//         fetch('api/v1/food-truck/menu', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newMenuItem)
//         })
//     })

//     // event
//     document.getElementById('add-event').addEventListener('submit', async (e) => {
//         e.preventDefault() // prevents page from not showing error
//         const newEvent = {
//             name: document.getElementById('event-name').value, 
//             location: document.getElementById('event-location').value, 
//             date: document.getElementById('event-date').value, 
//             time: document.getElementById('event-time').value
//         }
//         fetch('api/v1/food-truck/events', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify(newEvent)
//         })
//     })

// })()