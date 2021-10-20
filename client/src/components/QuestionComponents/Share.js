import React, { useState } from "react"
import { OverlayTrigger, Tooltip } from "react-bootstrap";

const Share = () =>{
  const[copy, setCopy] = useState(false)

  const handleShare = () =>{
    const url = document.createElement('textarea');
    url.value = window.location.href;
    url.setAttribute('readonly', '');
    url.style.position = 'absolute';
    url.style.left = '-9999px';
    document.body.appendChild(url);
    url.select();
    document.execCommand('copy');
    document.body.removeChild(url);
    setCopy(true)
  }

  return( 
    <>
    <OverlayTrigger
    placement="right"
    overlay={
      <Tooltip >
        {copy ? `${window.location.href} Copied!`:"Copy URL"}
      </Tooltip>
    }
    >
    <p onClick={()=>{handleShare()}} onMouseLeave={()=>{setCopy(false)}}>Share</p>
    </OverlayTrigger>
    </>
  )
}

export default Share