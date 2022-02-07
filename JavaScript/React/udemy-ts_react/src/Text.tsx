import { VFC } from "react";

type Props = {
    color:string;
    fontSize:string;
}
export const Text: VFC<Props> = (props)=>{
    const {color,fontSize} = props;
    return (
        <p style={{color,fontSize}}>textです</p>
    )
}