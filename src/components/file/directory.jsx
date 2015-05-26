
import React from 'react'
import dispatcher from 'dispatchers/appDispatcher'
import ACTIONS from 'constants/actions'
import Base from './base'


export default class Directory extends Base {
    constructor( props ) {
        super( props )
    }

    onClick( event ) {
        console.log( 'directory::onclick' )
        dispatcher.dispatch({
            type: ACTIONS.PATH,
            payload: this.props.file.get( 'path' )
        })
    }

    render() {
        return (
            <Base
                file={ this.props.file }
                onClick={ this.onClick.bind( this ) }>
                <div>{ this.props.file.get( 'path' ) }</div>
            </Base>
        )
    }
}
