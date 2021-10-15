import styled from "styled-components";

const DPLLightWeightButton = styled.button`
 display:inline-block;
 padding: 8px 16px;
 margin: 9px;
 border-style: solid;
 border-color: #6E54A3;
 border-radius: 5px;
 font-family:'Open Sans';
 font-weight:400;
 font-size: 18px;
 color:#FFFFFF;
 background-color:#6E54A3;
 text-align:center;
 transition: all 0.15s;
}
  &:hover{
   transform: translateY(-2px);
  }
`

export default DPLLightWeightButton
