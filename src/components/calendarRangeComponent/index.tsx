import React, { useState, useCallback, FunctionComponent } from "react";

import { Container, Content, ButtonContainer } from "./styles";

import moment from "moment";
import Button from "components/button";
import { pt } from "date-fns/locale";
import { DateRangeFocus, DateRangePickerCalendar } from "react-nice-dates";

interface Props {
  handleButton: (e: any) => void;
}

const CalendarRangeComponent: FunctionComponent<Props> = ({ handleButton }) => {
  const [startDate, setStartDate] = useState<any>();
  const [endDate, setEndDate] = useState<any>();
  const [focus, setFocus] = useState<DateRangeFocus>("startDate");

  const handleConfirmDates = useCallback(async () => {
    try {
      const newStartDate = startDate
        ? moment(startDate).format("DD/MM/YYYY")
        : null;
      const newEndDate = endDate ? moment(endDate).format("DD/MM/YYYY") : null;

      const dates = {
        startDate: newStartDate,
        endDate: newEndDate,
      };

      handleButton(dates);
    } catch (error) {}
  }, [startDate, endDate, handleButton]);

  const handleFocusChange = (newFocus: DateRangeFocus) => {
    setFocus(newFocus || "startDate");
  };

  return (
    <Container>
      <Content>
        <DateRangePickerCalendar
          startDate={startDate}
          endDate={endDate}
          focus={focus}
          onStartDateChange={(e: any) => setStartDate(e)}
          onEndDateChange={(e: any) => setEndDate(e)}
          onFocusChange={handleFocusChange}
          locale={pt}
        />
      </Content>

      <ButtonContainer>
        <Button fixedWidth text={"Filtrar"} handleButton={handleConfirmDates} />
      </ButtonContainer>
    </Container>
  );
};

export default CalendarRangeComponent;
