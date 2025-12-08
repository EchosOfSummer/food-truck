;(async () => {
    const eventBox = document.querySelector('#eventItems');

    if (!eventBox) return;

    const eventRes = await fetch('/api/v1/events');
    const eventData = await eventRes.json();

    // render events
    eventBox.innerHTML = '';
    eventData.forEach((item) => {
        const wrapper = document.createElement('article')
        wrapper.className = 'eventItems'

        const link = document.createElement('a')
        link.href = `/event/${item._id}`
        link.textContent = `${item.name} - ${item.date}`
        wrapper.appendChild(link)
        eventBox.appendChild(wrapper)
    })
})();