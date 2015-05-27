
import path from 'path'

import AnimationFrame from 'animation-frame'
import React from 'react'
import { Component } from 'immreact'
import classnames from 'classnames'

import dispatcher from 'dispatchers/appDispatcher'
import ACTIONS from 'constants/actions'

var raf = new AnimationFrame()


/**
 * A file can be in a few different states
 *   Corrupting: the virus is attacking the file health, if it gets to 0 it will corrupt
 *   Corrupted: the failure state, the virus has won
 *   - denoted by health === 0
 *   Repairing: the user is destroying the virus
 *   Repaired: the user has won, the virus is eliminated
 *   - denoted by cursor.get( 'repaired' )
 *   Resisted: the file resisted the virus
 *   - denoted by cursor.get( 'resisted' )
 */
export default class File extends Component {
    constructor( props ) {
        super( props )

        // @TODO this could be a hell of a lot cleaner
        this.cursor = {
            id: this.props.file.path,
            health: 100,
            chance: Math.random(),
            repaired: false,
            resisted: Math.random() > .7 ? true : false,
            corrupted: false,
            corrupting: null
        }

        // Handle to the animation frame whilst repairing
        this.repairingFrame = null

        // Handle to the animation frame whilst corrupting
        this.corruptingFrame = null

        this.init()

        // This feels a bit smelly - the frames should be held in
        // state somehow and automatically update on load
        dispatcher.register( dispatch => {
            if ( dispatch.type === ACTIONS.LOAD ) {
                this.init()
            }
        })
    }

    init() {
        if ( this.corruptingFrame ) {
            raf.cancel( this.corruptingFrame )
            this.corruptingFrame = null
        }

        if ( !this.cursor.get( 'repaired' ) &&
             !this.cursor.get( 'resisted' ) &&
             !this.cursor.get( 'corrupted' ) ) {
            console.log( this.shortPath, 'starting to corrupt' )
            this.corrupt()
        }
    }

    get shortPath() {
        return path.relative( this.props.cwd, this.props.file.path )
    }


    /**
     * Starts the virus countdown
     */
    corrupt() {
        let health = this.cursor.get( 'health' )
        let degrade = Math.random() > this.cursor.get( 'chance' ) ? --health : health

        if ( health < 0 ) {
            this.onCorrupted()
            return
        }

        this.update({
            health: degrade
        })

        this.corruptingFrame = raf.request( this.corrupt.bind( this ) )
    }

    /**
     * Fired when the virus has fully corrupted the file
     */
    onCorrupted() {
        console.log( 'I have become irrepairably corrupted', this.shortPath )
        this.update({
            corrupted: true
        })
    }

    /**
     * Clicking the file starts the repair process
     */
    repair() {
        let health = this.cursor.get( 'health' )

        if ( health === 100 ) {
            this.onRepaired()
            return
        }

        this.update({
            health: ++health
        })

        this.frame = raf.request( this.repair.bind( this ) )
    }

    /**
     * Fired when the repair has completed
     */
    onRepaired() {
        console.log( 'I am fully repaired', this.shortPath, '-', this.points, 'points awarded' )
        this.update({
            repaired: true
        })
        this.frame = null
    }


    onClick( event ) {
        // fail: Fully corrupted
        if ( this.cursor.get( 'health' ) === 0 ) {
            return
        }

        // if resisted award some points
        if ( this.cursor.get( 'resisted' ) ) {
            console.log( 'I resisted the virus, have a bonus' )
            return
        }

        // Else cancel any corrupting frame and start repairing
        raf.cancel( this.corruptingFrame )
        this.corruptingFrame = null
        console.log( 'file repair started', this.shortPath )
        this.points = this.cursor.get( 'health' )
        this.repair()
    }


    render() {
        let classes = classnames({
            File: true,
            'File--isDirectory': this.props.file.isDirectory,
            'File--isRepaired': this.cursor.get( 'repaired' ),
            'File--isResisted': this.cursor.get( 'resisted' ),
            'File--isCorrupted': this.cursor.get( 'corrupted' )
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
