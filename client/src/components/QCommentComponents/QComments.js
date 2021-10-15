import React from "react";
// import { AuthContext } from "../../providers/AuthProvider";
import QComment from "./QComment"
import QCommentAuthor from "./QCommentAuthor";


// I anticipate that props passed into this file should/will be answer and user
const QComments = ({question, qcomments, setQComments, addQComment, updateQComments, deleteQComment}) => {
  // const {user} = useContext(AuthContext)
  // const history = useHistory();


  const renderQComments = () => {
    return qcomments.map((qcomment) => {
      return(
        <div 
        style={styles.commentContainer}
        key = {qcomment.id}>
            <QCommentAuthor id={qcomment.id}/>
        <QComment key={qcomment.id} qcomments={qcomments} deleteQComment={deleteQComment} updateQComments={updateQComments} qcomment={qcomment} question={question}/>
        </div>
      )
    })
  }

  return (
    <>
    {renderQComments()}
    </>
  )
}

const styles = {
  commentContainer: {
    marginLeft: "207px",
    paddingTop: "28px",
    borderTop: "1px solid rgba(0, 0, 0, 0.3)",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start"
  },
}

export default QComments