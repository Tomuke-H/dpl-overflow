import styled from "styled-components";

const DPLButton = styled.button`
 display:inline-block;
 padding: 8px 16px;
 margin: 9px;
 border-style: solid;
 border-color: #6E54A3;
 border-radius: 5px;
 font-family:'Open Sans';
 font-weight:600;
 font-size: 14px;
 letter-spacing: .7px;
 color:#FFFFFF;
 background-color:#6E54A3;
 text-align:center;
 text-transform: uppercase;
 transition: all 0.15s;
}
  &:hover{
   transform: translateY(-2px);
  }
`

export default DPLButton
