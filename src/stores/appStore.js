
import { appState } from 'immreact'
import ACTIONS from 'constants/actions'
import dispatcher from 'dispatchers/appDispatcher'

window.appState = appState

class AppStore {
    constructor() {
        // @TODO this should probably be private so that access is
        // restricted via the dispatcher
        this.state = appState.create( 'appStore' )

        dispatcher.register( dispatch => {
            if ( dispatch.type === ACTIONS.FILES ) {
                this.update( dispatch.payload )
                return
            }

            if ( dispatch.type === ACTIONS.PATH ) {
                this.fetchPath( dispatch.payload )
                return
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

    /**
     * Fetches a new files path
     */
    fetchPath( path ) {
        fetch( '/files', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                path: path
            })
        })
            .then( res => res.json() )
            .then( data => {
                dispatcher.dispatch({
                    type: ACTIONS.FILES,
                    payload: data
                })
            })
    }
}

export default new AppStore()
