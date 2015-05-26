
// import './utils/font'

import path from 'path'
import React from 'react'

import dispatcher from 'dispatchers/appDispatcher'
import MyComponent from 'myComponent'
import ACTIONS from 'constants/actions'
import appStore from 'stores/appStore'

import { appState } from 'immreact'
import immstruct from 'immstruct'

window.immstruct = immstruct
window.store = appStore

class App extends React.Component {
    constructor() {
        super()
    }

    onClick( event ) {
        let input = this.refs.input.getDOMNode().value

        fetch( '/files', {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                path: input.length ? input : './'
            })
        })
            .then( res => res.json() )
            .then( data => {
                dispatcher.dispatch({
                    type: ACTIONS.FILES,
                    payload: data
                })

                console.log( 'from path route' )
                data.files
                    .filter( file => {
                        return !/^\./.test( file )
                    })
                    .forEach( file => {
                        // console.log( path.relative( data.cwd, file.path ) )
                    })
            })
    }

    render() {
        console.log( 'main::render' )

        let cwd = appStore.getCWD()

        let files = appStore.getFiles()
        let items = !files
            ? <li>Empty</li>
            : files.map( file => {
                return (
                    <li>{ path.relative( cwd, file.deref().get( 'path' ) ) }</li>
                )
            })

        return (
            <div className="container">
                <h1>Hello React</h1>
                <input ref="input" type="text" placeholder="path" />
                <button onClick={ this.onClick.bind( this ) }>Fetch path</button>
                <ul>
                    { items }
                </ul>
            </div>
        )
    }
}


function render() {
    React.render( <App />, document.body )
}

render()

appState.state.on( 'swap', render )
