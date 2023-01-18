import React from "react";
import LoginModal from "../../auth/LoginFormModal";
import styled from 'styled-components';

const LoginSignUpPage = () => {

    const LoginSignUpPageWrapper = styled.section`
        background-image: url('https://static3.srcdn.com/wordpress/wp-content/uploads/2019/08/mike-tyson-mysteries-poster.jpg');
        width: 100vw;
        height: 100vh;
    `;

    return (
        <div>
            <LoginSignUpPageWrapper>
                <div>
                    <p>this</p>
                    <LoginModal />
                </div>
            </LoginSignUpPageWrapper>
        </div>
    )
}

export default LoginSignUpPage;
