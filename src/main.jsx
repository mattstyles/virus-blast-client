
// import './utils/font'

import path from 'path'
import React from 'react'

import dispatcher from 'dispatchers/appDispatcher'
import MyComponent from 'myComponent'
import ACTIONS from 'constants/actions'
import appStore from 'stores/appStore'


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
            .then( res => {
                return res.json()
            } )
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
                        console.log( path.relative( data.cwd, file.path ) )
                    })
            })
    }

    render() {
        return (
            <div className="container">
                <h1>Hello React</h1>
                <input ref="input" type="text" placeholder="path" />
                <button onClick={ this.onClick.bind( this ) }>Fetch path</button>
            </div>
        )
    }
}

React.render( <App />, document.body )
