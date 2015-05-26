
import path from 'path'

import React from 'react'
import Base from './base'

export default class File extends Base {
    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <Base file={ this.props.file }>
                <div>{ path.relative( this.props.cwd, this.props.file.path ) }</div>
            </Base>
        )
    }
}
