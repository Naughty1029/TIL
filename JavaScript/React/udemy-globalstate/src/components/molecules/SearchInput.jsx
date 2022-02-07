import { PrimaryButton } from "../atoms/button/PrimaryButton";
import { Input } from "../atoms/input/input";
import styled from 'styled-components';
import { memo } from "react";


export const SearchInput = memo(() => {
    return (
        <div>
            <SContainer>
                <Input placeholder="検索条件を入力" />
                <SButtonWrapper>
                    <PrimaryButton>検索</PrimaryButton>
                </SButtonWrapper>
            </SContainer>
        </div>
    );
});

const SContainer = styled.div`
display:flex;
`;

const SButtonWrapper = styled.div`
padding-left:8px;
`;