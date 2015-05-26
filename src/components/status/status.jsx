
import React from 'react'
import { appState } from 'immreact'

export default class StatusBar extends React.Component {
    static propTypes = {
        cwd: React.PropTypes.string
    }

    static defaultProps = {
        cwd: ''
    }

    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <div className="Status u-stretchX">
                { this.props.cwd }
            </div>
        )
    }
}
