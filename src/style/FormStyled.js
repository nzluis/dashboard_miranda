import styled from "styled-components";

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px auto;
    width: 25%;

  
    
    label {
        display: flex;
        flex-direction: column;
        color: var(--padding-second);
          font-size: 17px;
    font-weight: 300;
    line-height: 27px;
    letter-spacing: 5px;
        
    }

    input {
        border: none;
        padding: 10px 15px;
        border: 1px solid var(--padding-second);
        border-radius: 12px;
        margin: 5px 0;
    }
    input:focus {
        outline:none;
        box-shadow: 0 0 1px 1px var(--padding-second);
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
        max-width: 60%
    }
`

export const FormAbsolute = styled(Form)`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
`