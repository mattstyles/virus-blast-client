
import path from 'path'

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

            if ( dispatch.type === ACTIONS.HOME ) {
                this.fetchHome()
                return
            }
        })
    }

    /**
     * Updates the appState with the new data object
     * Will trigger a swap event
     */
    update( data ) {
        this.state.cursor().update( cursor => {
            return cursor.merge( data )
        })
    }

    /**
     * Returns a cursor to the files as a list or null
     */
    getFiles() {
        let files = this.state.cursor().get( 'files' )
        return files
            ? files.toList()
            : null
    }

    /**
     * Returns a cursor to current working directory or null
     */
    getCWD() {
        let cwd = this.state.cursor().get( 'cwd' )

        return cwd || null
    }

    /**
     * Fetches a new files path
     * @param newpath <String> the path to fetch
     */
    fetchPath( newpath: string ) {
        fetch( '/files', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                path: this.getCWD() ? path.resolve( this.getCWD(), newpath ) : './'
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

    /**
     * Fetches the project home directory
     */
    fetchHome() {
        fetch( '/files', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                path: './'
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
