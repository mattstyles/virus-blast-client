
import React from 'react'
import { appState } from 'immreact'

export default class StatusBar extends React.Component {
    static propTypes = {
        cwd: React.PropTypes.string,
        points: React.PropTypes.number
    }

    static defaultProps = {
        cwd: '',
        points: 0
    }

    constructor( props ) {
        super( props )
    }

    render() {
        return (
            <div className="Status u-stretchX">
                <span>{ this.props.cwd }</span>
                <span className="Status-pts">{ this.props.points } pts</span>
            </div>
        )
    }
}
