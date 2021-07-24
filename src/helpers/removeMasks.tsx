export const removeMask = (text: any, type: string): string => {
  switch (type) {
    case "cpf":
      text = text.replace(".", "");
      text = text.replace(".", "");
      text = text.replace("-", "");
      break;
    case "cnpj":
      text = text.replace(".", "");
      text = text.replace(".", "");
      text = text.replace("/", "");
      text = text.replace("-", "");
      break;
    case "phone":
      text = text.replace("(", "");
      text = text.replace(")", "");
      text = text.replace(" ", "");
      text = text.replace("-", "");
      break;
    case "card":
      text = text.replace(".", "");
      break;
    case "price":
      text = text.replace(".", "");
      text = text.replace(",", ".");
      text = parseFloat(text);
      break;
  }

  return text;
};
