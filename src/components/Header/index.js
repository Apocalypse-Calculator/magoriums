import React from "react";
import styled from "styled-components";
import { Layout } from "antd";
import theme from "../theme";

const Container = styled(Layout.Header)``;

const Logo = styled.img`
  float: left;
  width: 50px;
  height: 50px;
  margin: 5px 0;
`;

const Title = styled.h2`
  color: ${theme.colors.text.primary};
`;

export const Header = () => {
  return (
    <Container>
      <Title>Magoriums</Title>
    </Container>
  );
};
