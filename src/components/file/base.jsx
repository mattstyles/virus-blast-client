
import React from 'react'
import classnames from 'classnames'

export default class FileBase extends React.Component {
    static propTypes = {
        file: React.PropTypes.object
    }

    constructor( props ) {
        super( props )
    }

    render() {
        let classes = classnames({
            File: true,
            'File-isDirectory': this.props.file.get( 'isDirectory' )
        })
        return (
            <li className={ classes }>
                { this.props.children }
            </li>
        )
    }
}
