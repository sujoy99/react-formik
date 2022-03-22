import React from 'react'

const TextError = (props) => {
    console.log("text error props", props)
    return (
        <div style={{color: "red"}}>
            {props.children}
        </div>
    )
}

export default TextError