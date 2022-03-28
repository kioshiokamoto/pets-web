import styled from "styled-components";

import { AppointmentStyledProps as Props } from "./Appointment.types";
import { BREAKPOINTS } from "../../utils/generic.utils";

const { tablet } = BREAKPOINTS;

const AppointmentStyled = styled.div<Props>`
  .Appointment {
    &__container {
      display: flex;
      @media (max-width: ${tablet}px) {
        flex-direction: column;
      }

      &-tabs {
        margin-bottom: 16px;
        flex-basis: 100px;
        margin-right: 24px;
        padding: 12px;
        @media (max-width: ${tablet}px) {
          flex-direction: column;
        }
      }
    }
  }
`;

export default AppointmentStyled;
