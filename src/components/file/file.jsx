
import path from 'path'

import AnimationFrame from 'animation-frame'
import React from 'react'
import { Component } from 'immreact'
import classnames from 'classnames'

var raf = new AnimationFrame()

export default class File extends Component {
    constructor( props ) {
        super( props )

        this.cursor = {
            id: this.props.file.path,
            health: 20
        }
    }

    onClick( event ) {
        var animate = function() {
            let health = this.cursor.get( 'health' )

            if ( health === 100 ) {
                return
            }

            this.update({
                health: ++health
            })
            raf.request( animate )
        }.bind( this )

        animate()
    }

    render() {
        let classes = classnames({
            File: true,
            'File-isDirectory': this.props.file.isDirectory
        })

        return (
            <li className={ classes } onClick={ this.onClick.bind( this ) }>
                <div>
                    <span>{ path.relative( this.props.cwd, this.props.file.path ) }</span>
                    <span>{ this.cursor.get( 'health' ) }</span>
                </div>
            </li>
        )
    }
}
