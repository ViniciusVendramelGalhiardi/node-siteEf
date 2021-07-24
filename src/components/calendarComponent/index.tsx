import React, {
  useState,
  useEffect,
  useCallback,
  FunctionComponent,
} from "react";

import {
  Container,
  Content,
  Text,
  Row,
  Column,
  Box,
  BoxContent,
  ButtonContainer,
  InputContainer,
} from "./styles";

import moment from "moment";
import Button from "components/button";
import { pt } from "date-fns/locale";
import { DatePickerCalendar } from "react-nice-dates";
import InputSelect from "components/inputSelect";
import { weeks } from "helpers/utils";
import { api } from "services/api";

interface Props {
  schedulingData?: any;
  professionalId: any;
  handleButton: (e: any) => void;
}

const CalendarComponent: FunctionComponent<Props> = ({
  schedulingData,
  professionalId,
  handleButton,
}) => {
  const [availableDates, setAvailableDates] = useState<String[]>([]);
  const [selectedHour, setSelectedHour] = useState<any>(null);
  const [hours, setHours] = useState<any>([]);
  const [typeService, setTypeService] = useState<number>(0);
  const [date, setDate] = useState<any>();
  const [officeHour, setOfficeHour] = useState<any>([]);

  const handleSaveDates = useCallback(async () => {
    try {
      const newDate = date ? moment(date).format("DD/MM/YYYY") : null;
      const week: any = date ? moment(date, "YYYY-MM-DD").format("dddd") : null;

      const newHours = hours.filter(
        (hour: any) => hour.value === selectedHour
      )[0];

      const scheduling = {
        professionalId,
        officeHourId: newHours.value,
        date: newDate,
        hour: newHours.label,
        weekDay: weeks[week],
        type: typeService === 1 ? "online" : "presencial",
      };

      handleButton(scheduling);
    } catch (error) {}
  }, [date, selectedHour, typeService, hours, handleButton, professionalId]);

  const handleSelectDate = useCallback(
    (e: any, shouldRefresh: boolean = true) => {
      setDate(e);

      if (shouldRefresh) {
        setSelectedHour(null);
      }

      const newDate = moment(e).format("DD/MM/YYYY");

      const newHours: any = [];

      for (let i = 0; i < officeHour.length; i++) {
        const element = officeHour[i];

        if (element.Expediente.Data === newDate) {
          const newElement = {
            value: element.Expediente.Idexpediente,
            label: element.Expediente.Horas.start,
          };

          newHours.push(newElement);
        }
      }

      setHours(newHours);
    },
    [officeHour]
  );

  const verifySchedulingData = async () => {
    if (schedulingData && schedulingData.date) {
      const dateMoment: any = moment(schedulingData.date, "DD/MM/YYYY");
      const newDate = new Date(dateMoment);

      handleSelectDate(newDate, false);
      setSelectedHour(schedulingData.officeHourId);
      setTypeService(schedulingData.type === "online" ? 1 : 2);
    }
  };

  const getOfficeHour = async () => {
    try {
      const { data } = await api.get(
        `web/ListarExpedienteProfissional/${professionalId}`
      );

      setOfficeHour(data);

      if (data.length > 0) {
        const newDates: any = [];

        for (let i = 0; i < data.length; i++) {
          const element = data[i];

          newDates.push(element.Expediente.Data);
        }

        setAvailableDates(newDates);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const init = async () => {
    await getOfficeHour();
    await verifySchedulingData();
  };

  useEffect(() => {
    init();

    return () => {
      setDate(null);
      setTypeService(0);
      setHours([]);
      setSelectedHour("");
    };
  }, []);

  const handleDisabledDates = useCallback(
    (date: any) => {
      const filtered = availableDates.filter(
        (available) => moment(date).format("DD/MM/YYYY") === available
      )[0];

      if (!filtered) {
        return date;
      }
    },
    [availableDates]
  );

  const modifiers = {
    disabled: (date: any) => handleDisabledDates(date),
  };

  return (
    <Container>
      <Content>
        <Text
          color={"#002464"}
          size={"15px"}
          bold
          padding={"0px 10px 0px 10px"}
        >
          Quando você precisa
        </Text>
        <Text
          color={"#002464"}
          size={"15px"}
          bold
          padding={"0px 10px 10px 10px"}
        >
          ser atendido?
        </Text>

        <Row margin={"0px 0px 10px 0px"}>
          <Column onClick={() => setTypeService(1)}>
            <Row>
              <Box checked={typeService === 1}>
                <BoxContent checked={typeService === 1} />
              </Box>

              <Column>
                <Text
                  color={typeService === 1 ? "#0878D3" : "#797979"}
                  size={"15px"}
                  bold={typeService === 1 ? true : false}
                >
                  Consulta
                </Text>

                <Text
                  color={typeService === 1 ? "#0878D3" : "#797979"}
                  size={"15px"}
                  bold={typeService === 1 ? true : false}
                >
                  Online
                </Text>
              </Column>
            </Row>
          </Column>

          <Column onClick={() => setTypeService(2)}>
            <Row>
              <Box checked={typeService === 2}>
                <BoxContent checked={typeService === 2} />
              </Box>

              <Column>
                <Text
                  color={typeService === 2 ? "#0878D3" : "#797979"}
                  size={"15px"}
                  bold={typeService === 2 ? true : false}
                >
                  Consulta
                </Text>

                <Text
                  color={typeService === 2 ? "#0878D3" : "#797979"}
                  size={"15px"}
                  bold={typeService === 2 ? true : false}
                >
                  Presencial
                </Text>
              </Column>
            </Row>
          </Column>
        </Row>

        <DatePickerCalendar
          date={date}
          onDateChange={(e: any) => handleSelectDate(e, true)}
          locale={pt}
          minimumDate={new Date()}
          modifiers={modifiers}
        />

        <InputContainer padding={"10px 0px 0px 0px"}>
          <InputSelect
            label={"Horários Disponíveis"}
            options={hours}
            value={selectedHour}
            error={false}
            onChange={(e) => setSelectedHour(e)}
          />
        </InputContainer>
      </Content>

      <ButtonContainer>
        <Button
          width={"232px"}
          height={"64px"}
          text={"Agendar Consulta"}
          handleButton={handleSaveDates}
        />
      </ButtonContainer>
    </Container>
  );
};

export default CalendarComponent;
