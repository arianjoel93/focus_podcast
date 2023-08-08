import "./Error.scss"

const Error = ({ error, width }) => {
    return (
        <div style={width &&{maxWidth:width, width:'100%'}} className={error.msg ? error.error == true ? "Errors red" : "Errors blue" : "Errors"}>{error.msg}</div>
    )
}

export default Error