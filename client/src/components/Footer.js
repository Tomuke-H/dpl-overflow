import React from 'react'
import { Nav, Navbar, Image } from 'react-bootstrap'
import FacebookIcon from '../../src/icons/FacebookIcon.png'
import instagramIcon from '../../src/icons/instagramIcon.png'
import TwitterIcon from '../../src/icons/TwitterIcon.png'
import YouTubeIcon from '../../src/icons/YouTubeIcon.png'

const Footer = () => {
  return (
    <div>
      <Navbar bg="white" fixed="bottom" style={{borderTop: 'solid 2px #C4C4C4', padding: '15px'}}>
        <Nav.Item>
          <Nav.Link href='https://www.instagram.com/devpointlabs/' target="_blank" style={{margin: "0px", padding: "0px"}}>
            <Image src={instagramIcon} style={styles.iglogo} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='https://twitter.com/devpointlabs' target="_blank" style={{margin: "0px", padding: "0px"}}>
            <Image src={TwitterIcon} style={styles.twitterlogo} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='https://www.facebook.com/DevPointLabs/' target="_blank" style={{margin: "0px", padding: "0px"}}>
            <Image src={FacebookIcon} style={styles.fblogo} />
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link href='https://www.youtube.com/c/Devpointlabs' target="_blank" style={{margin: "0px", padding: "0px"}}>
            <Image src={YouTubeIcon} style={styles.ytlogo} />
          </Nav.Link>
        </Nav.Item>
      </Navbar>
      <div>
        <p>DevPoint Labs LLC 2021. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer;


const styles = {
  iglogo: {
    width: "16px",
    height: "17px",
    margin: "0 14px 0 85px",
    padding: "0px",
  },

  twitterlogo: {
    width: "23px",
    height: "22px",
    marginRight: "11px",
    padding: "0px",
  },

  fblogo: {
    width: "20px",
    height: "19px",
    marginRight: "11px",
    padding: "0px",
  },

  ytlogo: {
    width: "22px",
    height: "21px",
    margin: "0px",
    padding: "0px",
  },
}