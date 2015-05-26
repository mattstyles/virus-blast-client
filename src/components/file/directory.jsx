
import path from 'path'

import React from 'react'
import dispatcher from 'dispatchers/appDispatcher'
import ACTIONS from 'constants/actions'

import Base from './base'


export default class Directory extends Base {
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
        return (
            <Base
                file={ this.props.file }
                onClick={ this.onClick.bind( this ) }>
                <div>{ path.relative( this.props.cwd, this.props.file.path ) }</div>
            </Base>
        )
    }
}
