
import path from 'path'

import { appState } from 'immreact'
import ACTIONS from 'constants/actions'
import APPCONFIG from 'constants/app'
import dispatcher from 'dispatchers/appDispatcher'

window.appState = appState

class AppStore {
    constructor() {
        // @TODO this should probably be private so that access is
        // restricted via the dispatcher
        this.state = appState.create( 'appStore', {
            points: 0,
            corruption: 0
        })

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

            if ( dispatch.type === ACTIONS.SAVE ) {
                this.save()
                return
            }

            if ( dispatch.type === ACTIONS.LOAD ) {
                this.load()
                return
            }

            if ( dispatch.type === ACTIONS.POINTS ) {
                this.update({
                    points: this.state.cursor().get( 'points' ) + dispatch.payload.points
                })
            }

            if ( dispatch.type === ACTIONS.CORRUPT ) {
                this.update({
                    corruption: this.state.cursor().get( 'corruption' ) + dispatch.payload.corruption
                })
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
     * Grabs the points
     */
    getPoints() {
        return this.state.cursor().get( 'points' )
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

    /**
     * Saves the current app state to local storage
     */
    save() {
        try {
            window.localStorage.setItem( APPCONFIG.LS, JSON.stringify( appState.state.cursor().toJSON() ) )
        } catch ( err ) {
            console.error( 'Error saving to local storage' )
            console.error( err )
            return
        }

        console.log( 'saved' )
    }

    /**
     * Loads the currently saved state from local storage
     */
    load() {
        try {
            appState.state.cursor().update( cursor => {
                return cursor.merge( JSON.parse( window.localStorage.getItem( APPCONFIG.LS ) ) )
            })
        } catch( err ) {
            console.error( 'Error loading from local storage' )
            console.error( err )
            return
        }

        console.log( 'loaded' )
    }
}

export default new AppStore()
