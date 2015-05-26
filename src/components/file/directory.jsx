
import React from 'react'
import Base from './base'

export default class Directory extends Base {
    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <Base file={ this.props.file }>
                <div>A directory</div>
            </Base>
        )
    }
}
