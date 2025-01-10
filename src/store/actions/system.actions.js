import { store } from '../store'
import { LOAD_FILTER } from '../reducers/system.reducer'

export async function renderFilterBar(boolean) {
    try {
        console.log('boolean', boolean)
        store.dispatch({ type: LOAD_FILTER, bool: boolean })
    } catch (err) {
        console.log('Cannot load filter', err)
        throw err
    }
}