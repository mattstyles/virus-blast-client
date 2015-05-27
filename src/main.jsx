
import './utils/font'

import path from 'path'
import React from 'react'

import dispatcher from 'dispatchers/appDispatcher'
import ACTIONS from 'constants/actions'
import appStore from 'stores/appStore'

import { appState } from 'immreact'

import StatusBar from 'status/status'
import Files from 'file/files'
import Menu from 'menu/menu'
import Integrity from 'integrity/integrity'


// @TODO remove
window.store = appStore

class App extends React.Component {
    constructor() {
        super()
    }

    componentDidMount() {
        dispatcher.dispatch({
            type: ACTIONS.PATH,
            payload: './'
        })
    }

    render() {
        return (
            <div className="container u-fit-fix">
                <Menu />
                <article className="main">
                    <StatusBar
                        cwd={ appStore.getCWD() }
                        points={ appStore.getPoints() }
                    />
                    <section className="main-section">
                        <Files />
                        <Integrity corruption={ appStore.getCorruption() } />
                    </section>
                </article>
            </div>
        )
    }
}



function render() {
    React.render( <App />, document.body )
}

render()

appState.state.on( 'swap', render )
