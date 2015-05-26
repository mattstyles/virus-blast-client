
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
        let items = !files
            ? <li>Empty</li>
            : files
                .map( file => {
                    return file.get( 'isDirectory' )
                        ? <Directory file={ file.deref() } />
                        : <File file={ file.deref() } />
                })

        return (
            <ul className="Files">
                { items }
            </ul>
        )
    }
}
