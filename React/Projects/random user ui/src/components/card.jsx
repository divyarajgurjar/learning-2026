import { useState } from "react"

import "../styles/Card.css"


function Card({info, loading, getUser}){
    const user = info

    const [showDetails, setShowDetails] = useState(false)
    const [copyDetailsStatus, setCopyDetailsStatus] = useState(false)
    /*Ek card hoga
    Picture aur detail show karegi.
    Do button honge
        More Info
        Prev User
        Next User
    */
   const handleToggle = () =>{
    setShowDetails(prev => !prev)
   }
   const handleCopy = () =>{
    navigator.clipboard.writeText(JSON.stringify(user, null, 2))
    setCopyDetailsStatus(true)
    setTimeout(() => setCopyDetailsStatus(false), 1500)
   }

   

    return (<>
    <div id="card">
        <div>
            <div id="image-box">
                <img src={user.picture.large} alt=""  />
            </div>
            <div id="username">
                <h1>{`${user.name.first} ${user.name.last}`}</h1>
            </div>
            <div id="location">
            <address>{`${user.location.street.name}, ${user.location.city}, ${user.location.country}`}</address>
            </div>
            <div id="email-details">
                <address>
                   <span>E-mail:</span> <a href={`mailto:${user.email}`}>{user.email}</a>
                </address>
            </div>
        </div>
        {showDetails && (<div id="more-details">
            <p>Date of Birth: {user.dob.date.slice(0,10)}</p>
            <p>Age: {user.dob.age}</p>

            <address id="contact-details" >
                <a href={`tel:+${user.phone}`}>Phone No.: {user.phone}</a> <br />
                <a href={`tel:+${user.cell}`}>Phone No. {user.cell}</a>
            </address>

            <div id="login-details">
                <p>UUID: {user.login.uuid}</p>
                <p>Username: {user.login.username}</p>
                <p>Password: {user.login.password}</p>
                <p>Salt: {user.login.salt}</p>
                <p>MD5: {user.login.md5}</p>
                <p>SHA1: {user.login.sha1}</p>
                <p>SHA256: {user.login.sha256}</p>
            </div>
        </div>)}
        <div id="user-profile-btn">
            <button id="btn-details" onClick={handleToggle}>
                {showDetails ? "Hide Details" : "Show Details"}
            </button>
            <button id="btn-copy" onClick={handleCopy}>
            {copyDetailsStatus ? "Copied" : "Copy Details"}
            </button>
            </div>
            <button id="btn-next" onClick={getUser} disabled={loading}>
            {loading ? "Loading..." : "Get Another User"}
            </button>
        
    </div>
    </>)
}

export default Card