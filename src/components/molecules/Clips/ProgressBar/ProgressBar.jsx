import { useState } from "react"
import "./ProgressBar.scss"


const ProgressBar = () => {
    const [porcentage, setPorcentage] = useState(30)
    const dashArray = 35 * Math.PI * 2
    const dashOffSet= dashArray - (dashArray * 50)/100

    return (
        <div>

            {/* <input type="range" min="1" max="100" step={1} onChange={(e) => setPorcentage(e.target.value)} value={porcentage} /> */}
            <svg width={100} height={100} viewBox="0 0 200 200">
                <circle 
                cx={100/2} 
                cy={100/2} 
                strokeWidth={"15px"}  
                r={35} 
                className="circle-background"
                style={{strokeDasharray:dashArray, strokeDashoffset:dashOffSet}}
                >

                </circle>
            </svg>
        </div>
    )
}

export default ProgressBar