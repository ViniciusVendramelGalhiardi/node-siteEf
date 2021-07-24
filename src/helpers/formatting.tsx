interface Formatting {
  [key: string]: (value: string) => string;
}

const limitCharacters = (maxLength: number, value: string) => {
  if (value.length >= maxLength) {
    value = value.substr(0, maxLength);
  }

  return value;
};

const formatCNPJ = (value: string) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1/$2");
  value = value.replace(/(\d{4})(\d)/, "$1-$2");

  return value;
};

const formatCPF = (value: string) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{3})(\d)/, "$1.$2");
  value = value.replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.(\d{3})(\d)/, ".$1-$2");

  return value;
};

const formatRG = (value: string) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1.$2");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
  value = value.replace(/\.([A-z\d]{3})([[A-z\d])/, ".$1-$2");

  return value;
};

const formatTel = (value: string) => {
  if (!value) {
    return value;
  }

  value = value.replace(/\D/g, "");

  if (value.length > 2) {
    value = `(${value.substr(0, 2)}) ${value.substr(2)}`;
  }

  if (value.length > 9) {
    value = `${value.substr(0, 9)}-${value.substr(9)}`;
  }

  if (value.length > 14) {
    value = value.replace("-", "");
    value = `${value.substr(0, 10)}-${value.substr(10, 15)}`;
  }

  return value;
};

const formatCardNumber = (value: string) => {
  value = limitCharacters(22, value);

  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{4})(\d)/g, "$1 $2");
  value = value.replace(/^(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3");
  value = value.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, "$1 $2 $3 $4");
  return value;
};

const formatDate = (value: string) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1/$2");
  value = value.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");

  return value;
};

const formatDateCard = (value: string) => {
  value = limitCharacters(5, value);

  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{2})(\d)/, "$1/$2");

  return value;
};

const formatCep = (value: string) => {
  value = value.replace(/\D/g, "");
  value = value.replace(/^(\d{5})(\d)/g, "$1-$2");

  return value;
};

const formatWeight = (value: string) => {
  const number = Number(value.replace(/\D/g, ""));
  let newValue = (number / 1000).toFixed(3) + "";
  newValue = newValue.replace(".", ",");
  newValue = newValue.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  newValue = newValue.replace(/(\d)(\d{3}),/g, "$1.$2,");
  value = newValue;

  return value;
};

const formatNumber = (value: string) => {
  return value.replace(/\D/g, "");
};

const formatCurrency = (value: string) => {
  let number: number = Number(value.replace(/\D/g, ""));
  let newValue = (number / 100).toFixed(2) + "";
  newValue = newValue.replace(".", ",");
  newValue = newValue.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
  value = newValue.replace(/(\d)(\d{3}),/g, "$1.$2,");

  return value;
};

export const setFormat = (value: string, type: string): string => {
  const format: Formatting = {
    cnpj: (value: string) => formatCNPJ(value),
    cpf: (value: string) => formatCPF(value),
    rg: (value: string) => formatRG(value),
    phone: (value: string) => formatTel(value),
    telephone: (value: string) => formatTel(value),
    cep: (value: string) => formatCep(value),
    date: (value: string) => formatDate(value),
    cardDate: (value: string) => formatDateCard(value),
    cardNumber: (value: string) => formatCardNumber(value),
    weight: (value: string) => formatWeight(value),
    number: (value: string) => formatNumber(value),
    currency: (value: string) => formatCurrency(value),
  };

  if (!format[type]) {
    return value;
  }

  return format[type](value);
};
