
import React from 'react'

import ACTIONS from 'constants/actions'
import dispatcher from 'dispatchers/appDispatcher'

let icons = {
    [ ACTIONS.HOME ]: 'HOME',
    [ ACTIONS.SAVE ]: 'SAVE',
    [ ACTIONS.LOAD ]: 'LOAD'
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

    onInputChange( event ) {

        if ( event.charCode === 13 ) {
            dispatcher.dispatch({
                type: ACTIONS.PATH,
                payload: event.target.value.length ? event.target.value : './'
            })
        }
    }

    render() {
        return (
            <nav className="Menu">

                <input
                    ref="input"
                    className="Menu-search"
                    type="text"
                    placeholder="path"
                    onKeyPress={ this.onInputChange.bind( this )} />

                <ul>
                    <MenuButton action={ ACTIONS.HOME } />
                    <MenuButton action={ ACTIONS.SAVE } />
                    <MenuButton action={ ACTIONS.LOAD } />
                </ul>
            </nav>
        )
    }
}
