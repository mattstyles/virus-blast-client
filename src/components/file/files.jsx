
import path from 'path'

import React from 'react'
import appStore from 'stores/appStore'

import File from './file'
import Directory from './directory'


export default class Files extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        let files = appStore.getFiles()
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
                .map( file => {
                    return file.isDirectory
                        ? <Directory key={ file.path } file={ file } cwd={ appStore.getCWD() } />
                        : <File key={ file.path } file={ file } cwd={ appStore.getCWD() } />
                })

        return (
            <ul className="Files">
                { items }
            </ul>
        )
    }
}
