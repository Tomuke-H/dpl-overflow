import React from "react";

const TagErrorMessage = ({err}) => {
  return (
    <div style={styles.wrapper}>
      {JSON.stringify(err)}
    </div>
  )
}

const styles = {
  wrapper: {
    border: 'solid 2px red'   
  }
}

export default TagErrorMessage