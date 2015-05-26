
import React from 'react'

import ACTIONS from 'constants/actions'
import dispatcher from 'dispatchers/appDispatcher'

let icons = {
    [ ACTIONS.HOME ]: 'HOME',
    [ ACTIONS.SAVE ]: 'SAVE',
    [ ACTIONS.LOAD ]: 'LOAD'
}


class MenuHome extends React.Component {
    constructor( props ) {
        super( props )
    }

    onClick( event ) {
        dispatcher.dispatch({
            type: ACTIONS.HOME
        })
    }

    render() {
        return <button onClick={ this.onClick.bind( this ) }>HOME</button>
    }
}

class MenuButton extends React.Component {
    constructor( props ) {
        super( props )
    }

    onClick( event ) {
        dispatcher.dispatch({
            type: this.props.action
        })
    }

    render() {
        let icon = {
            __html: icons[ this.props.action ]
        }

        return (
            <li>
                <button
                    className="Menu-btn u-stretchX"
                    dangerouslySetInnerHTML={ icon }
                    onClick={ this.onClick.bind( this ) } >
                </button>
            </li>
        )
    }
}


export default class Menu extends React.Component {
    constructor( props ) {
        super( props )
    }

    onClick( event ) {
        let input = this.refs.input.getDOMNode().value

        dispatcher.dispatch({
            type: ACTIONS.PATH,
            payload: input.length ? input : './'
        })
    }

    render() {
        return (
            <nav className="Menu u-pullLeft">

                <input ref="input" type="text" placeholder="path" />
                <button onClick={ this.onClick.bind( this ) }>Fetch path</button>
                <ul>
                    <MenuButton action={ ACTIONS.HOME } />
                    <MenuButton action={ ACTIONS.SAVE } />
                    <MenuButton action={ ACTIONS.LOAD } />
                </ul>
            </nav>
        )
    }
}