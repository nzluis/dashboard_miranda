import styled, { css } from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    width: ${props => props.width === 'login' ? '250px' : '40%'};

  
    
    label {
        display: flex;
        flex-direction: column;
        color: var(--padding-second);
        width: 100%;
        font-size: 17px;
        font-weight: 300;
        line-height: 27px;
        letter-spacing: 2px;
        margin-top: 5px;
    }

    input, select {
        padding: 10px 15px;
        border-radius: 12px;
        margin: 5px 0;
        border: 1px solid var(--padding-second);
    }
    input:focus {
        outline: .3px solid var(--padding-second);
    }

    button {
        margin-top: 20px;
        max-width: fit-content ;
    }

    p {
        margin-top: 5px;
        text-align: center;
        font-size: 12px; 
        color: var(--padding-first);
    }

    select {
        cursor: pointer;
         background-color: white;
    }

    input[type="file"] {
        display: none
    }

    textarea {
        border: 1px solid var(--padding-second);
        border-radius: 12px;
        padding: 10px 15px;
        resize: none;
        margin-top: 5px;
    }
    textarea:focus {
        outline: .3px solid var(--padding-second);
    }
`
export const FormRow = styled(Form)`
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 15px;
    margin: 0;
    input {
        height: 38px;
    }
`

export const FormAbsolute = styled(Form)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`

export const FileStyled = styled.label`
    text-align: center;
    background-color: white;
    border: 1px solid var(--padding-second);
    width: fit-content !important;
    border-radius: 12px;
    cursor: pointer;
    align-self: flex-end;

    &:active {
        box-shadow: -1px -1px .5px .5px gray;
        transform: translate(1px,1px)
    }
`

export const UserFileStyled = styled(FileStyled)`
    padding: 5px 10px;
    align-self: center;
`