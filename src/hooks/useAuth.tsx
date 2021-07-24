import React, { useState, createContext, useContext } from "react";
import secure from "../config/secureLS";
import { api } from "../services/api";
interface UserInterface {
  id: number;
  userIuguId: string;
  userType: number;
  name: string;
  email: string;
  cnpj?: string;
  cpf?: string;
  image?: string | null;
}
interface AuthContextData {
  isLogged: boolean;
  user: UserInterface;
  // setUser: (user: UserInterface) => void;
  logOut: () => void;
  signIn: (form: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const getUser = () => {
    const user = secure.get("userLogged");

    return user?.data;
  };

  const [user, setUser] = useState<UserInterface>(getUser());

  const saveUser = (user: UserInterface) => {
    secure.set("userLogged", { data: user });
    setUser(user);
  };

  const logOut = () => {
    secure.clear();
  };

  const signIn = async (params: any) => {
    try {
      const { data } = await api.post(
        `web/EfetuaLogin/?email=${params.email}&senha=${params.password}&idperfil=${params.type}`
      );

      if (!data || (data && Object.keys(data).length === 0)) {
        return false;
      }

      const user = {
        id: data.idUsuario,
        userIuguId: data.idUsuarioIugu
          ? data.idUsuarioIugu
          : data.IdUsuarioIugu
          ? data.IdUsuarioIugu
          : "",
        userType: parseInt(data.IdPerfil),
        name: data.Nome,
        email: data.Email,
        cnpj: data.Cnpj ?? "",
        cpf: data.Cpf,
        image: data.BaseImage,
      };

      await saveUser(user);

      return true;
    } catch (e) {
      console.log("e", e);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, logOut, user, isLogged: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado com o AuthProvider");
  }

  return context;
}

// const useAuth = (): UseAuthInterface => {
//   const getToken = () => {
//     const token = secure.get("access-token");

//     return token?.data;
//   };

//   const getUser = () => {
//     const user = secure.get("userLogged");

//     return user?.data;
//   };

//   const [token, setToken] = useState(getToken());
//   const [user, setUser] = useState<UserInterface>(getUser());

//   const saveToken = (userToken: string) => {
//     secure.set("access-token", { data: userToken });
//     setToken(userToken);
//   };

//   const saveUser = (user: UserInterface) => {
//     secure.set("userLogged", { data: user });
//     setUser(user);
//   };

//   const logOut = () => {
//     secure.clear();
//   };

//   const signIn = async (params: any) => {
//     try {
//       const { data } = await api.post(
//         `web/EfetuaLogin/?email=${params.email}&senha=${params.password}&idperfil=${params.type}`
//       );

//       if (!data) {
//         return false;
//       }

//       const user = {
//         id: data.idUsuario,
//         userIuguId: data.idUsuarioIugu
//           ? data.idUsuarioIugu
//           : data.IdUsuarioIugu
//           ? data.IdUsuarioIugu
//           : "",
//         userType: parseInt(data.IdPerfil),
//         name: data.Nome,
//         email: data.Email,
//         cnpj: data.Cnpj ?? "",
//         cpf: data.Cpf,
//       };

//       await saveUser(user);

//       return true;
//     } catch (e) {
//       console.log("e", e);
//       return false;
//     }
//   };

//   return {
//     token,
//     setToken: saveToken,
//     user,
//     setUser: saveUser,
//     logOut,
//     signIn,
//   } as UseAuthInterface;
// };

export { AuthProvider, useAuth };
