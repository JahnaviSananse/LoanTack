import {Colors} from 'src/themes/colors';
import styled from 'styled-components/native';

export const CenterTabButton = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 25px;
  background-color: ${Colors.light.activeTintColor};
`;
