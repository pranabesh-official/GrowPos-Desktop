import React, { Component } from 'react';
import './dot.css'
class Dot extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    render() {
        const { color, position, mx, Size , inherit } = this.props
        let padd
        if(inherit){
            padd = inherit
        }
        return (
            <div className="dot" style={{ justifyContent: position || "space-around" , height: `${Size +1}px` || "15px", }}>
                <span style={{
                    background: color || "green",
                    marginLeft: `${mx}px` || "3px",
                    marginRight: `${mx}px` || "3px",
                    height: `${Size}px` || "14px",
                    width: `${Size}px` || "14px",
                    padding : padd || '0px'
                }}
                ></span>
            </div>
        )
    }
}

export default Dot;