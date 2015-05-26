
import path from 'path'

import { Component } from 'immreact'
import React from 'react'
import classnames from 'classnames'
import dispatcher from 'dispatchers/appDispatcher'
import ACTIONS from 'constants/actions'


export default class Directory extends Component {
    static propTypes = {
        file: React.PropTypes.object,
        cwd: React.PropTypes.string
    }

    constructor( props ) {
        super( props )
    }

    onClick( event ) {
        console.log( 'directory::onclick' )
        dispatcher.dispatch({
            type: ACTIONS.PATH,
            payload: this.props.file.path
        })
    }

    render() {
        let classes = classnames({
            File: true,
            'File-isDirectory': this.props.file.isDirectory
        })
        return (
            <li className={ classes } onClick={ this.onClick.bind( this ) }>
                <div>{ path.relative( this.props.cwd, this.props.file.path ) }</div>
            </li>
        )
    }
}
