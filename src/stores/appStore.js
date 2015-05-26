
import { appState } from 'immreact'
import ACTIONS from 'constants/actions'
import dispatcher from 'dispatchers/appDispatcher'

window.appState = appState

class AppStore {
    constructor() {
        appState.state.cursor().update( cursor => {
            return cursor.merge({
                appStore: {}
            })
        })

        this.state = appState.state.reference( 'appStore' )

        dispatcher.register( dispatch => {
            if ( dispatch.type === ACTIONS.FILES ) {
                console.log( 'Store heard the file update' )
                console.log( dispatch.payload )
                this.update( dispatch.payload )
            }
        })
    }

    // Updates appState with new data object
    update( data ) {
        this.state.cursor().update( cursor => {
            return cursor.merge( data )
        })
    }

    getFiles() {
        let files = this.state.cursor().get( 'files' )
        return files
            ? files.toList()
            : null
    }

    getCWD() {
        let cwd = this.state.cursor().get( 'cwd' )

        return cwd || ''
    }
}

export default new AppStore()
