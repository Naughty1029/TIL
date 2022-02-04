import styled from "styled-components";
import { useHistory } from "react-router-dom";
import {SecondaryButton} from "../atoms/button/SecondaryButton";

export const Top = () =>{
    const history = useHistory();
    const onClickAdmin = () => history.push({pathname:"/users",state:{isAdmin:true}});
    const onClickGeneral = () => history.push({pathname:"/users",state:{isAdmin:false}});
    return(
        <Scontainer>
            <h2>Topページです</h2>
            <SecondaryButton onClick={onClickAdmin}>管理者ユーザー</SecondaryButton>
            <br />
            <br />
            <SecondaryButton onClick={onClickGeneral}>一般ユーザー</SecondaryButton>
        </Scontainer>
    );
}

const Scontainer = styled.div`
text-align:center;
`;