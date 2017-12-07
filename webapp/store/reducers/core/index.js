import { handleActions } from 'redux-actions'
import { SET_PROGRESS } from '../../constants/action-types'

export default handleActions({

  [SET_PROGRESS]: (state, action) => ({
    ...state,
    progress: action.payload || 0
  })

}, {
  progress: 0
})
