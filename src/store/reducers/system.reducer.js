export const LOADING_START = 'LOADING_START'
export const LOADING_DONE = 'LOADING_DONE'
export const LOAD_FILTER = 'LOAD_FILTER'

const initialState = {
  isLoading: false,
  isHomePage: false
}

export function systemReducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOADING_START:
      return { ...state, isLoading: true }
    case LOADING_DONE:
      return { ...state, isLoading: false }
    case LOAD_FILTER:
      return { ...state, isHomePage: action.bool }
    default: return state
  }
}
