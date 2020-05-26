import styled from "styled-components";
import { Button as AntBTN } from "antd";
import theme from "../theme";

export const Button = styled(AntBTN)`
  background: ${theme.colors.background.primary};
  color: #fff;
`;
