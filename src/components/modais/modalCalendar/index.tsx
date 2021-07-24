import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";

import { Container, Text, Buttons } from "./styles";
import { CustomModal } from "styles";

import moment from "moment";
import { pt } from "date-fns/locale";
import { isSameDay } from "date-fns";

import { Fade } from "@material-ui/core";

import { Calendar } from "react-nice-dates";

import Button from "components/button";
import { weeks } from "helpers/utils";
// import { useAuth } from "hooks/useAuth";

interface Props {
  data?: any;
  open: boolean;
  close: (e: any) => void;
}

const ModalCalendar: FunctionComponent<Props> = ({ data, open, close }) => {
  // const { user } = useAuth();
  const [disabledDates, setDisabledDates] = useState<any>([]);
  const [selectedDates, setSelectedDates] = useState<any>([]);

  const handleClose = (data: any) => {
    setDisabledDates([]);
    setSelectedDates([]);
    close(data);
  };

  const handleSaveDates = useCallback(async () => {
    try {
      const dates: any = {
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: [],
        sunday: [],
      };

      for (let i = 0; i < selectedDates.length; i++) {
        const element = selectedDates[i];

        const newDate = moment(element).format("DD/MM/YYYY");
        const week: any = moment(element, "YYYY-MM-DD").format("dddd");

        const date = {
          date: newDate,
        };

        dates[week.toLowerCase()].push(date);
      }

      handleClose(dates);
    } catch (error) {}
  }, [selectedDates]);

  const handleDisabledDates = (date: any) => {
    const filtered = disabledDates.filter(
      (disabled: any) => moment(date).format("YYYY-MM-DD") === disabled
    )[0];

    if (filtered) {
      return date;
    }
  };

  const handleSelectedDates = useCallback(
    (date: any) => {
      return selectedDates.some((selectedDate: any) =>
        isSameDay(selectedDate, date)
      );
    },
    [selectedDates]
  );

  const handleDayClick = useCallback(
    (date: any) => {
      const newDates = [...selectedDates];

      const exist = newDates.filter(
        (selectedDate: any) => selectedDate.toString() === date.toString()
      )[0];

      let newSelectedDates: any = [];

      if (exist) {
        newSelectedDates = newDates.filter(
          (selectedDate: any) => selectedDate.toString() !== date.toString()
        );
      } else {
        newDates.push(date);
        newSelectedDates = newDates;
      }

      setSelectedDates(newSelectedDates);
    },
    [selectedDates]
  );

  const getProfessionalDates = async () => {
    try {
      setDisabledDates(["2021-05-19", "2021-06-25"]);
    } catch (error) {}
  };

  const init = async () => {
    await getProfessionalDates();
  };

  useEffect(() => {
    init();
  }, []);

  useEffect(() => {
    if (data !== []) {
      const newSelectedDates: any = [];

      if (data.monday && data.monday.length > 0) {
        for (let i = 0; i < data.monday.length; i++) {
          const element = data.monday[i];

          const dateMoment: any = moment(element.date, "DD/MM/YYYY");
          const newDate = new Date(dateMoment);

          newSelectedDates.push(newDate);
        }
      }

      if (data.tuesday && data.tuesday.length > 0) {
        for (let i = 0; i < data.tuesday.length; i++) {
          const element = data.tuesday[i];

          const dateMoment: any = moment(element.date, "DD/MM/YYYY");
          const newDate = new Date(dateMoment);

          newSelectedDates.push(newDate);
        }
      }

      if (data.wednesday && data.wednesday.length > 0) {
        for (let i = 0; i < data.wednesday.length; i++) {
          const element = data.wednesday[i];

          const dateMoment: any = moment(element.date, "DD/MM/YYYY");
          const newDate = new Date(dateMoment);

          newSelectedDates.push(newDate);
        }
      }

      if (data.thursday && data.thursday.length > 0) {
        for (let i = 0; i < data.thursday.length; i++) {
          const element = data.thursday[i];

          const dateMoment: any = moment(element.date, "DD/MM/YYYY");
          const newDate = new Date(dateMoment);

          newSelectedDates.push(newDate);
        }
      }

      if (data.friday && data.friday.length > 0) {
        for (let i = 0; i < data.friday.length; i++) {
          const element = data.friday[i];

          const dateMoment: any = moment(element.date, "DD/MM/YYYY");
          const newDate = new Date(dateMoment);

          newSelectedDates.push(newDate);
        }
      }

      if (data.saturday && data.saturday.length > 0) {
        for (let i = 0; i < data.saturday.length; i++) {
          const element = data.saturday[i];

          const dateMoment: any = moment(element.date, "DD/MM/YYYY");
          const newDate = new Date(dateMoment);

          newSelectedDates.push(newDate);
        }
      }

      if (data.sunday && data.sunday.length > 0) {
        for (let i = 0; i < data.sunday.length; i++) {
          const element = data.sunday[i];

          const dateMoment: any = moment(element.date, "DD/MM/YYYY");
          const newDate = new Date(dateMoment);

          newSelectedDates.push(newDate);
        }
      }

      setSelectedDates(newSelectedDates);
    }
  }, [data]);

  const modifiers = {
    selected: (date: any) => handleSelectedDates(date),
    disabled: (date: any) => handleDisabledDates(date),
  };

  return (
    <CustomModal open={open} onClose={() => handleClose(null)}>
      <Fade in={open}>
        <Container>
          <Text color={"#002464"} size={"16px"} bold padding={"20px 10px"}>
            Data do Atendimento
          </Text>

          <Calendar
            onDayClick={handleDayClick}
            modifiers={modifiers}
            locale={pt}
            minimumDate={new Date()}
          />

          <Buttons>
            <Button fixedWidth text={"Salvar"} handleButton={handleSaveDates} />
          </Buttons>
        </Container>
      </Fade>
    </CustomModal>
  );
};

export default ModalCalendar;
