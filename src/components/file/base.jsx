
import React from 'react'
import classnames from 'classnames'

function onClick( event ) {
    throw new Error( 'FileBase::onClick -- abstract' )
}

export default class FileBase extends React.Component {
    static propTypes = {
        file: React.PropTypes.object,
        onClick: React.PropTypes.func
    }

    static defaultProps = {
        onClick: onClick
    }

    constructor( props ) {
        super( props )
    }

    render() {
        let classes = classnames({
            File: true,
            'File-isDirectory': this.props.file.isDirectory
        })
        return (
            <li className={ classes } onClick={ this.props.onClick }>
                { this.props.children }
            </li>
        )
    }
}
