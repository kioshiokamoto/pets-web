import styled from "styled-components";

import { AppointmentDetailStyledProps as Props } from "./AppointmentDetail.types";

const AppointmentDetailStyled = styled.div<Props>`
  .AppointmentDetail {
    &__image {
      width: 12rem;
      height: 12rem;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
    }
  }
`;

export default AppointmentDetailStyled;
