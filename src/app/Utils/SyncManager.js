const KEYS = {
    Sync: 'Sync',
    SyncId: 'SyncId'
}

export function insert(data) {
    let Sync = getAll();
    data['id'] = generateId()
    Sync.push(data)
    localStorage.setItem(KEYS.Sync, JSON.stringify(Sync))
}

export function update(data) {
    let Sync = getAll();
    let recordIndex = Sync.findIndex(x => x.id === data.id);
    Sync[recordIndex] = { ...data }
    localStorage.setItem(KEYS.Sync, JSON.stringify(Sync));
}

export function Delete(id) {
    let Sync = getAll();
    Sync = Sync.filter(x => x.id !== id)
    localStorage.setItem(KEYS.Sync, JSON.stringify(Sync));
}

export function generateId() {
    if (localStorage.getItem(KEYS.SyncId) == null)
        localStorage.setItem(KEYS.SyncId, '0')
    var id = parseInt(localStorage.getItem(KEYS.SyncId))
    localStorage.setItem(KEYS.SyncId, (++id).toString())
    return id;
}

export function getAll() {
    if (localStorage.getItem(KEYS.Sync) == null)
        localStorage.setItem(KEYS.Sync, JSON.stringify([]))
    let Sync = JSON.parse(localStorage.getItem(KEYS.Sync));
 
    return Sync
}