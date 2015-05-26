
import { appState } from 'immreact'
import ACTIONS from 'constants/actions'
import dispatcher from 'dispatchers/appDispatcher'

class AppStore {
    constructor() {
        this.state = appState.state.cursor().update( cursor => {
            return cursor.merge({
                files: []
            })
        })

        dispatcher.register( dispatch => {
            if ( dispatch.type === ACTIONS.FILES ) {
                console.log( 'Store heard the file update' )
                console.log( dispatch.payload )
            }
        })
    }
}

export default new AppStore()
