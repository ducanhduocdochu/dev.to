import { Session } from "next-auth";
import { FC } from "react";
import CommentDetail from "./CommentDetail";
import { CommentType } from "@/typeProp";

const CommentDetailWidget: FC<{ session: Session | null | undefined, list_comment: CommentType[]  }> = ({
  session, list_comment
}) =>{
  return (
    <div>
      {list_comment?.map((item) => 
        <CommentDetail session = {session} comment = {item} level = {1} />
      )}
    </div>
  );
}

export default CommentDetailWidget;
