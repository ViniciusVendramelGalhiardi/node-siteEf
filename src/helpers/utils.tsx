import { BackendError, ErrorInterface } from "../interfaces/error";
import { Form } from "../hooks/useForm";
import axios from "axios";
import moment from "moment";

export function handleErrors(e: BackendError, error: Form) {
  const newErrors: ErrorInterface = {} as ErrorInterface;

  if (e.errors) {
    e.errors.forEach((err) => {
      newErrors[err.property] = err.description;
    });
  }

  return { ...error, ...newErrors };
}

export function calculateAge(day: number, month: number, year: number) {
  var date = new Date();

  const currentDay = date.getDate();
  const currentMonth = date.getMonth() + 1;
  const currentYear = date.getFullYear();

  let age = currentYear - year;

  if (currentMonth < month || (currentMonth == month && currentDay < day)) {
    age--;
  }

  return age < 0 ? 0 : age;
}

export const days = [
  { value: "01", label: 1 },
  { value: "02", label: 2 },
  { value: "03", label: 3 },
  { value: "04", label: 4 },
  { value: "05", label: 5 },
  { value: "06", label: 6 },
  { value: "07", label: 7 },
  { value: "08", label: 8 },
  { value: "09", label: 9 },
  { value: "10", label: 10 },
  { value: "11", label: 11 },
  { value: "12", label: 12 },
  { value: "13", label: 13 },
  { value: "14", label: 14 },
  { value: "15", label: 15 },
  { value: "16", label: 16 },
  { value: "17", label: 17 },
  { value: "18", label: 18 },
  { value: "19", label: 19 },
  { value: "20", label: 20 },
  { value: "21", label: 21 },
  { value: "22", label: 22 },
  { value: "23", label: 23 },
  { value: "24", label: 24 },
  { value: "25", label: 25 },
  { value: "26", label: 26 },
  { value: "27", label: 27 },
  { value: "28", label: 28 },
  { value: "29", label: 29 },
  { value: "30", label: 30 },
  { value: "31", label: 31 },
];

export const months = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Fev" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Abr" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Ago" },
  { value: "09", label: "Set" },
  { value: "10", label: "Out" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dez" },
];

export function years() {
  const currentYear = new Date().getFullYear();
  const oldYear = currentYear - 100;
  const years = [];

  for (let i = currentYear; i > oldYear; i--) {
    const newYear = {
      value: i,
      label: i,
    };

    years.push(newYear);
  }

  return years;
}

export function expirationYear() {
  const currentYear = new Date().getFullYear();
  const futureYear = currentYear + 10;
  const years = [];

  for (let i = currentYear; i < futureYear; i++) {
    const newYear = {
      value: i,
      label: i,
    };

    years.push(newYear);
  }

  return years;
}

export function timeCourses(time: number = 50) {
  const maxHour = time === 30 ? 48 : time === 50 ? 29 : 24;

  const hours = [];

  let anterior: any = 0;

  for (let i = 0; i < maxHour; i++) {
    let hour = null;

    if (i === 0) {
      hour = moment(i, "HH:mm").format("HH:mm");
    } else {
      hour = moment(anterior, "HH:mm").add(time, "minutes").format("HH:mm");
    }

    const newHour = {
      value: hour,
      label: hour,
    };

    anterior = hour;

    hours.push(newHour);
  }

  return hours;
}

export const quantitySons = [
  { value: "0", label: "Não possuo filhos" },
  { value: "1", label: "1 filho" },
  { value: "2", label: "2 filhos" },
  { value: "3", label: "3 filhos" },
  { value: "4", label: "+ 3 filhos" },
];

export const civilStatus = [
  { value: "Solteiro", label: "Solteiro" },
  { value: "Casado", label: "Casado" },
  { value: "Viúvo", label: "Viúvo (a)" },
  { value: "Separado judicialmente", label: "Separado judicialmente" },
  { value: "Divorciado", label: "Divorciado" },
];

export const genders = [
  { value: "Masculino", label: "Masculino" },
  { value: "Feminino", label: "Feminino" },
  { value: "Outros", label: "Outros" },
];

export const professionPsychologistId = 10;

export const durationOfCare = [
  { value: "30min.", label: "30 Minutos" },
  { value: "50min.", label: "50 Minutos" },
  { value: "1h", label: "1 Hora" },
];

export const academicLevel = [
  { value: "Graduação", label: "Graduação" },
  { value: "Bacharelado", label: "Bacharelado" },
  { value: "Licenciatura", label: "Licenciatura" },
  { value: "Pós-Graduação", label: "Pós-Graduação" },
  { value: "Mestrado", label: "Mestrado" },
  { value: "Doutorado", label: "Doutorado" },
];

export const symptoms = {
  column1: [
    { id: 1, name: "Marcas Todos" },
    { id: 2, name: "Abusos Emocionais" },
    { id: 3, name: "Abusos Físicos" },
    { id: 4, name: "Adoção de Filhos" },
    { id: 5, name: "Agressividade" },
    { id: 6, name: "Alienação Parental" },
    { id: 7, name: "Ansiedade" },
    { id: 8, name: "Ansiedade" },
    { id: 9, name: "Autismo" },
    { id: 10, name: "Autoconhecimento" },
    { id: 11, name: "Autoestima" },
    { id: 12, name: "Avaliação Psicológica" },
    { id: 13, name: "Bulling" },
    { id: 14, name: "Burnout" },
    { id: 15, name: "Cirurgia Bariátrica" },
  ],
  column2: [
    { id: 1, name: "Compulsôes" },
    { id: 2, name: "Conflitos Familiares" },
    { id: 3, name: "Conflitos Profissionais" },
    { id: 4, name: "Déficit Atenção Hiperatividade" },
    { id: 5, name: "Depressão" },
    { id: 6, name: "Depressão Pós Parto" },
    { id: 7, name: "Disfunção Sexual" },
    { id: 8, name: "Dislexia" },
    { id: 9, name: "Doenças Crônicas" },
    { id: 10, name: "Dores Psicosomáticas" },
    { id: 11, name: "Esquizofrenia" },
    { id: 12, name: "Estresse" },
    { id: 13, name: "Estresse Pós Traumático" },
    { id: 14, name: "Fobia Social" },
    { id: 15, name: "Gravidez" },
  ],
  column3: [
    { id: 1, name: "Limite na Educação dos Filhos" },
    { id: 2, name: "Luto" },
    { id: 3, name: "Hipocondria" },
    { id: 4, name: "Imagem Corporal" },
    { id: 5, name: "Insônia" },
    { id: 6, name: "Medos / Outras Fobias" },
    { id: 7, name: "Obesidade" },
    { id: 8, name: "Orientação Profissional" },
    { id: 9, name: "Orientação Vocacional" },
    { id: 10, name: "Problemas de Aprendizagem" },
    { id: 11, name: "Questões da Infância" },
    { id: 12, name: "Questões da Adolescência" },
    { id: 13, name: "Questões da Terceira Idade" },
    { id: 14, name: "Questões Financeiras" },
    { id: 15, name: "Reprodução Assistida" },
  ],
  column4: [
    { id: 1, name: "Separação" },
    { id: 2, name: "Sexualidade" },
    { id: 3, name: "Síndrome do Pânico" },
    { id: 4, name: "Timidez" },
    { id: 5, name: "Transtorno Obsessivo Compulsivo" },
    { id: 6, name: "Transtorno Bipolar" },
    { id: 7, name: "Transtornos Alimentares" },
    { id: 8, name: "Traumas Emocionais / Físicos" },
    { id: 9, name: "Violência Doméstica" },
    { id: 10, name: "Violência Sexual" },
    { id: 11, name: "Vício em Álcool" },
    { id: 12, name: "Vício em Drogas" },
    { id: 13, name: "Vício em Internet" },
    { id: 14, name: "Vício em Jogos" },
    { id: 15, name: "Outro Não Especificado Aqui" },
  ],
};

export const approach = [
  { id: 1, name: "Psicanálise" },
  { id: 2, name: "Gestalt" },
  { id: 3, name: "Sistêmica" },
  { id: 4, name: "Comportamental" },
  { id: 5, name: "Fenomenologia" },
  { id: 6, name: "Teste1" },
  { id: 7, name: "Teste2" },
];

export const languages = [
  { id: 1, name: "Inglês" },
  { id: 2, name: "Espanhol" },
  { id: 3, name: "Libras" },
  { id: 4, name: "Francês" },
  { id: 5, name: "Italiano" },
];

export const publics = [
  { id: 1, name: "Crianças" },
  { id: 2, name: "Adolescentes" },
  { id: 3, name: "Terceira Idade" },
  { id: 4, name: "Adultos" },
  { id: 5, name: "Casais" },
];

export const allServiceHours = [
  { id: 1, name: "Até 10h /semana" },
  { id: 2, name: "10 a 20h /semana" },
  { id: 3, name: "20 a 40h /semana" },
  { id: 4, name: "Mais de 40h /semana" },
];

export const weekend = [
  { id: 1, name: "Aos Sábados" },
  { id: 2, name: "Aos Domingos" },
  { id: 3, name: "Não atendo aos finais de semana" },
];

export const presentationLetter =
  "Exemplo de carta de apresentação: \n\nPsicólogo(a) pela INSTITUIÇÃO-UF (ANO); Formação em Análise Comportamental Clínica pela INSTITUIÇÃO, Instituto de Análise do Comportamento (ANO). Especialização em Saúde Integrativa e Bem-Estar pelo INSTITUTO (ANO). Experiência clínica de TANTOS anos em consultório particular e de TANTOS anos em clínica popular. Atendo pela abordagem Cognitivo Comportamental na área clínica, realizando avaliação, diagnóstico e tratamento para adultos, empregando técnicas e estratégias de coping (enfrentamento de problemas), regulação emocional, modificação de comportamentos, dentre outros. Voluntário(a) na INSTITUIÇÃO. \n\nVocê pode ainda deixar uma breve mensagem aos clientes, exemplo: Seja você o responsável pelo seu bem estar! O processo analítico engloba os mais diversos sintomas, inibições e conflitos, contribui para o auto-conhecimento e para a resignificação de vários aspectos de sua vida.";

export const banks = [
  { value: "Itaú", label: "Itaú" },
  { value: "Bradesco", label: "Bradesco" },
  { value: "Caixa Econômica", label: "Caixa Econômica" },
  { value: "Banco do Brasil", label: "Banco do Brasil" },
  { value: "Santander", label: "Santander" },
  { value: "Banrisul", label: "Banrisul" },
  { value: "Sicredi", label: "Sicredi" },
  { value: "Sicoob", label: "Sicoob" },
  { value: "Inter", label: "Inter" },
  { value: "BRB", label: "BRB" },
  { value: "Via Credi", label: "Via Credi" },
  { value: "Neon", label: "Neon" },
  { value: "Votorantim", label: "Votorantim" },
  { value: "Nubank", label: "Nubank" },
  { value: "Pagseguro", label: "Pagseguro" },
  { value: "Banco Original", label: "Banco Original" },
  { value: "Safra", label: "Safra" },
  { value: "Modal", label: "Modal" },
  { value: "Banestes", label: "Banestes" },
  { value: "Unicred", label: "Unicred" },
  { value: "Money Plus", label: "Money Plus" },
  { value: "Mercantil do Brasil", label: "Mercantil do Brasil" },
  { value: "JP Morgan", label: "JP Morgan" },
  {
    value: "Gerencianet Pagamentos do Brasil",
    label: "Gerencianet Pagamentos do Brasil",
  },
  { value: "Banco C6", label: "Banco C6" },
  { value: "BS2", label: "BS2" },
  { value: "Banco Topazio", label: "Banco Topazio" },
  { value: "Uniprime", label: "Uniprime" },
  { value: "Stone", label: "Stone" },
  { value: "Banco Daycoval", label: "Banco Daycoval" },
  { value: "Rendimento", label: "Rendimento" },
  { value: "Banco do Nordeste", label: "Banco do Nordeste" },
  { value: "Citibank", label: "Citibank" },
  { value: "PJBank", label: "PJBank" },
  {
    value: "Cooperativa Central de Credito Noroeste Brasileiro",
    label: "Cooperativa Central de Credito Noroeste Brasileiro",
  },
  { value: "Uniprime Norte do Paraná", label: "Uniprime Norte do Paraná" },
  { value: "Global SCM", label: "Global SCM" },
  { value: "Next", label: "Next" },
  { value: "Cora", label: "Cora" },
  { value: "Mercado Pago", label: "Mercado Pago" },
  { value: "Banco da Amazonia", label: "Banco da Amazonia" },
  { value: "BNP Paribas Brasil", label: "BNP Paribas Brasil" },
  { value: "Juno", label: "Juno" },
  { value: "Cresol", label: "Cresol" },
  { value: "BRL Trust DTVM", label: "BRL Trust DTVM" },
  { value: "Banco Banese", label: "Banco Banese" },
];

export const weeks: any = {
  Monday: "Segunda-feira",
  Tuesday: "Terça-feira",
  Wednesday: "Quarta-feira",
  Thursday: "Quinta-feira",
  Friday: "Sexta-feira",
  Saturday: "Sábado",
  Sunday: "Domingo",
};

export const moneyToNumber = (item: string) => {
  let money = item.replace(".", "");
  money = money.replace(",", ".");

  return money;
};

export const numberToMoney = (num: string | number) => {
  if (!num) {
    num = 0;
  }

  return parseFloat(num.toString())
    .toFixed(2)
    .replace(".", ",")
    .replace(/(\d)(?=(\d{3})+,)/g, "$1.");
};

export const convertDurationServiceToMinutes = (value: string) => {
  const min = value.includes("min");

  if (min) {
    value = value.replace("min", "");

    return parseInt(value);
  }

  value = value.replace("h", "");

  return parseInt(value) * 60;
};

export async function convertBlobToBase64(blob: any) {
  const reader = new FileReader();

  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result);
    };
  });
}

export async function getAddress(zipcodeClean: string, zipcode: string) {
  const { data, status } = await axios.get(
    `https://api.postmon.com.br/v1/cep/${zipcodeClean}`
  );

  if (status !== 200) {
    return false;
  }

  return {
    logradouro: data.logradouro,
    bairro: data.bairro,
    cidade: data.cidade,
    estado: data.estado,
  };
}

export async function calculateRating(rating: any) {
  const calcRating =
    5 * rating[5] +
    4 * rating[4] +
    3 * rating[3] +
    2 * rating[2] +
    1 * rating[1];
  const calcTotal = rating[5] + rating[4] + rating[3] + rating[2] + rating[1];

  return Math.round(calcRating / calcTotal).toFixed(2);
}
