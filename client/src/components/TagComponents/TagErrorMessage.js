import React from "react";

const TagErrorMessage = ({err}) => {
  return (
    <div style={styles.wrapper}>
      {err}
    </div>
  )
}

const styles = {
  wrapper: {
    border: 'solid 2px #ff7777',
    margin: '0px 0px 20px 0px',
    padding: '2px',
    color: '#ff7777',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '10px'
  }
}

export default TagErrorMessage