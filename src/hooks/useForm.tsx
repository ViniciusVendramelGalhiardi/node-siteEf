import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useState,
} from "react";
import { setFormat } from "../helpers/formatting";
import { validationTypes } from "../helpers/inputValidation";

type TypeForm =
  | ""
  | "name"
  | "date"
  | "cpf"
  | "rg"
  | "cep"
  | "cnpj"
  | "email"
  | "phone"
  | "telephone"
  | "password"
  | "currency"
  | "number"
  | "cardNumber";

interface ConfForm {
  type: TypeForm;
  required?: boolean;
  value?: string;
  limit?: number;
}

interface FormData {
  [key: string]: ConfForm;
}

export interface Form {
  [key: string]: any;
}

interface UseFormType {
  form: Form;
  setValueForm: (index: string, value: string) => void;
  onChange: (index: string, event: ChangeEvent<HTMLInputElement>) => void;
  onBlur: (index: string) => boolean;
  validateForm: () => boolean;
  error: Form;
  setError: Dispatch<SetStateAction<Form>>;
  clearForm: () => void;
}

const useForm = (formData: FormData): UseFormType => {
  const [data, setData] = useState<FormData>(formData);
  const [error, setError] = useState<Form>({});
  const [form, setForm] = useState<Form>(() => {
    return Object.entries(data).reduce((acc, item) => {
      if (item[1].value) {
        item[1].value = setFormat(item[1].value, item[1].type);
      }

      acc[item[0]] = item[1].value ?? "";
      return acc;
    }, {} as Form);
  });

  const CreateData = (form: FormData) => {
    const formatForm = Object.entries(form).reduce((acc, item) => {
      acc[item[0]] = item[1].value ?? "";
      return acc;
    }, {} as Form);

    setForm(formatForm);
  };

  const validateForm = useCallback(() => {
    let status = true;

    Object.entries(data).map((item) => {
      const { type, required, value } = item[1];

      if (required && (!value || value?.length === 0)) {
        error[item[0]] = "Campo obrigatório";
        setError({ ...error });

        status = false;
        return status;
      }

      if (
        type &&
        validationTypes[type] &&
        value &&
        !validationTypes[type](value).valid
      ) {
        error[item[0]] = validationTypes[type](value).message;
        setError({ ...error });

        status = false;
        return status;
      }

      error[item[0]] = "";
      setError({ ...error });

      return status;
    });

    return status;
  }, [data, error]);

  const onBlur = useCallback(
    (index: string) => {
      const { type, required, value } = data[index];

      if (!required && !type) return true;

      if (required && (!value || value?.length === 0)) {
        error[index] = "Campo obrigatório";
        setError({ ...error });

        return false;
      }

      if (
        type &&
        validationTypes[type] &&
        value &&
        !validationTypes[type](value).valid
      ) {
        error[index] = validationTypes[type](value).message;
        setError({ ...error });

        return false;
      }

      error[index] = "";
      setError({ ...error });

      return true;
    },
    [data, error]
  );

  function changeLimit(value: string, limit: number | undefined) {
    if (!limit) return value;

    if (limit >= value.length) {
      return value;
    }

    return value.slice(0, -1);
  }

  const onChange = useCallback(
    (index: string, { target }: ChangeEvent<HTMLInputElement>) => {
      const type = data[index].type;

      target.value = setFormat(target.value, type);

      if (data[index].limit) {
        target.value = changeLimit(target.value, data[index].limit);
      }

      data[index].value = target.value;
      setData({ ...data });

      if (error[index]) onBlur(index);
      CreateData(data);
    },
    [data, error, onBlur]
  );

  const setValueForm = useCallback(
    (index: string, value: string) => {
      const type = data[index].type;

      value = setFormat(value, type);

      data[index].value = value;
      setData({ ...data });

      if (error[index]) onBlur(index);
      CreateData(data);
    },
    [data, error, onBlur]
  );

  const clearForm = useCallback(() => {
    Object.entries(data).map((item) => {
      return (item[1].value = "");
    }, {} as Form);

    setData({ ...data });
    CreateData(data);
  }, [data]);

  return {
    form,
    setValueForm,
    onChange,
    onBlur,
    validateForm,
    error,
    setError,
    clearForm,
  };
};

export default useForm;
