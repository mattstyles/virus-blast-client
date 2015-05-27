
import React from 'react'
import APPCONFIG from 'constants/app'

export default class Integrity extends React.Component {
    constructor( props ) {
        super( props )
    }

    render() {
        let barHeight = {
            height: this.props.corruption / APPCONFIG.MAX_CORRUPTION_LEVEL * 100
        }

        return (
            <aside className="Integrity">
                <h3 className="Integrity-title">Integrity</h3>
                <div className="Integrity-barWrapper">
                    <div className="Integrity-barInner">
                        <div className="Integrity-bar" style={ barHeight }></div>
                    </div>
                </div>
            </aside>
        )
    }
}
