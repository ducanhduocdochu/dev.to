import { Session } from "next-auth";
import { FC } from "react";
import CommentDetail from "./CommentDetail";

const CommentDetailWidget: FC<{ session: Session | null | undefined }> = ({
  session
}) =>{
  return (
    <div>
      <CommentDetail session ={session} />
      <CommentDetail session ={session} />
      <CommentDetail session ={session} />
      <CommentDetail session ={session} />
      <CommentDetail session ={session} />
    </div>
  );
}

export default CommentDetailWidget;
