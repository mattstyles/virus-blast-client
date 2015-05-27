
import path from 'path'

import React from 'react'
import { Component } from 'immreact'
import appStore from 'stores/appStore'

import File from './file'
import Directory from './directory'

import shouldPureComponentUpdate from 'react-pure-render/function'

export default class Files extends Component {
    constructor( props ) {
        super( props )
    }

    shouldComponentUpdate = shouldPureComponentUpdate

    render() {
        // This grab at appStore means this is not a pure component, hmm
        // let files = appStore.getFiles()

        let files = this.props.files

        // Adds '../' to move back a directory and maps to components
        // @TODO converting to a JS object here feels clunky
        let items = !files
            ? <li>Empty</li>
            : files
                .unshift({
                    path: path.join( appStore.getCWD(), '../' ),
                    isDirectory: true,
                    size: 0
                })
                .toJS()
                .sort( curr => {
                    return !curr.isDirectory
                })
                .map( file => {
                    return file.isDirectory
                        ? <Directory key={ file.path } file={ file } cwd={ appStore.getCWD() } />
                        : <File key={ file.path } file={ file } cwd={ appStore.getCWD() } />
                })

        return (
            <div className="Files">
                <h2 className="Files-title">Files</h2>
                <ul>
                    { items }
                </ul>
            </div>
        )
    }
}
