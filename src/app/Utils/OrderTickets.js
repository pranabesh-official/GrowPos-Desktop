const KEYS = {
    orderTickets: 'orderTickets',
    orderTicketsId: 'orderTicketsId'
}

export function insert(data) {
    let orderTickets = getAll();
    data['id'] = generateId()
    orderTickets.push(data)
    localStorage.setItem(KEYS.orderTickets, JSON.stringify(orderTickets))
}

export function update(data) {
    let orderTickets = getAll();
    let recordIndex = orderTickets.findIndex(x => x.id === data.id);
    orderTickets[recordIndex] = { ...data }
    localStorage.setItem(KEYS.orderTickets, JSON.stringify(orderTickets));
}

export function Delete(id) {
    let orderTickets = getAll();
    orderTickets = orderTickets.filter(x => x.id !== id)
    localStorage.setItem(KEYS.orderTickets, JSON.stringify(orderTickets));
}

export function generateId() {
    if (localStorage.getItem(KEYS.orderTicketsId) == null)
        localStorage.setItem(KEYS.orderTicketsId, '0')
    var id = parseInt(localStorage.getItem(KEYS.orderTicketsId))
    localStorage.setItem(KEYS.orderTicketsId, (++id).toString())
    return id;
}

export function getAll() {
    if (localStorage.getItem(KEYS.orderTickets) == null)
        localStorage.setItem(KEYS.orderTickets, JSON.stringify([]))
    let orderTickets = JSON.parse(localStorage.getItem(KEYS.orderTickets));
 
    return orderTickets
}