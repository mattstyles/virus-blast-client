
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
            health: 100,
            chance: Math.random(),
            repaired: false
        }

        this.frame = null
        this.degrading = null
    }

    componentDidMount() {
        if ( !this.cursor.get( 'repaired' ) ) {
            this.degrade()
        }
    }

    get shortPath() {
        return path.relative( this.props.cwd, this.props.file.path )
    }

    degrade() {
        let health = this.cursor.get( 'health' )
        let degrade = Math.random() * .5 > this.cursor.get( 'chance' ) ? --health : health

        if ( health < 0 ) {
            console.log( 'I have become irrepairably corrupted', this.shortPath )
            return
        }

        this.update({
            health: degrade
        })

        this.degrading = raf.request( this.degrade.bind( this ) )
    }

    repair() {
        let health = this.cursor.get( 'health' )

        if ( health === 100 ) {
            console.log( 'I am fully repaired', this.shortPath, '-', this.points, 'points awarded' )
            this.update({
                repaired: true
            })
            this.frame = null
            return
        }

        this.update({
            health: ++health
        })

        this.frame = raf.request( this.repair.bind( this ) )
    }

    onClick( event ) {
        if ( !this.degrading ) {
            return
        }

        if ( this.cursor.get( 'health' ) === 0 ) {
            return
        }

        raf.cancel( this.degrading )
        this.degrading = null
        console.log( 'file repaired started', this.shortPath )
        this.points = this.cursor.get( 'health' )
        this.repair()
    }

    render() {
        let classes = classnames({
            File: true,
            'File--isDirectory': this.props.file.isDirectory
        })

        let backgroundStyle = {
            width: ( 100 - this.cursor.get( 'health' ) ) + '%'
        }

        return (
            <li className={ classes } onClick={ this.onClick.bind( this ) }>
                <div>
                    <span className="File-background" style={ backgroundStyle }></span>
                    <span>{ this.shortPath }</span>
                    <span>{ this.cursor.get( 'health' ) }</span>
                </div>
            </li>
        )
    }
}
