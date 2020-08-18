import React, { useState, useEffect, useContext } from "react";
import createAuth0Client, {
  RedirectLoginOptions,
  IdToken,
  PopupLoginOptions,
  RedirectLoginResult,
  getIdTokenClaimsOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  LogoutOptions,
  Auth0ClientOptions,
} from "@auth0/auth0-spa-js";
import Auth0Client from "@auth0/auth0-spa-js/dist/typings/Auth0Client";
import { Api } from "./api";
import { AxiosResponse, AxiosError } from "axios";
import { IProfile } from "models/Profiles";

export interface Auth0RedirectState {
  targetUrl?: string;
}

export type Auth0User = Omit<IdToken, "__raw">;

interface Auth0Context {
  user?: Auth0User;
  isAuthenticated: boolean;
  hasDetailedProfile: boolean;
  isInitializing: boolean;
  isPopupOpen: boolean;
  loginWithPopup(o?: PopupLoginOptions): Promise<void>;
  handleRedirectCallback(): Promise<RedirectLoginResult>;
  getIdTokenClaims(o?: getIdTokenClaimsOptions): Promise<IdToken>;
  loginWithRedirect(o?: RedirectLoginOptions): Promise<void>;
  getTokenSilently(o?: GetTokenSilentlyOptions): Promise<string | undefined>;
  getTokenWithPopup(o?: GetTokenWithPopupOptions): Promise<string | undefined>;
  logout(o?: LogoutOptions): void;
  updateProfile(o?: boolean): void;
}
interface Auth0ProviderOptions {
  children: React.ReactElement;
  onRedirectCallback(result: RedirectLoginResult): void;
}

export const Auth0Context = React.createContext<Auth0Context | null>(null);
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const useAuth0 = () => useContext(Auth0Context)!;
export const Auth0Provider = ({
  children,
  onRedirectCallback,
  ...initOptions
}: Auth0ProviderOptions & Auth0ClientOptions) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hasDetailedProfile, setHasDetailedProfile] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [user, setUser] = useState<Auth0User>();
  const [auth0Client, setAuth0Client] = useState<Auth0Client>();

  const getProfile = (): Promise<Auth0User> => {
    const client = new Api({});
    return new Promise((resolve, reject) => {
      client
        .get<Auth0User>("/user.json")
        .then((response: AxiosResponse<Auth0User>) => {
          const { data } = response;
          const state: Auth0User = {
            nickname: data.nickname,
            name: data.name,
            picture: data.picture,
            updatedAt: data.updatedAt,
            email: data.email,
            emailVerified: data.emailVerified,
            sub: data.sub,
          };
          resolve(state);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  };

  const getDetailedProfile = (): Promise<IProfile> => {
    const client = new Api({});
    return new Promise((resolve, reject) => {
      client
        .get<IProfile>("/api/profile.json")
        .then((response: AxiosResponse<IProfile>) => {
          const { data } = response;
          resolve(data);
        })
        .catch((error: AxiosError) => {
          reject(error);
        });
    });
  };

  const updateProfile = (): void => {
    setHasDetailedProfile(true);
  };

  useEffect(() => {
    const initAuth0 = async () => {
      const auth0FromHook = await createAuth0Client(initOptions);
      setAuth0Client(auth0FromHook);

      getProfile()
        .then(userProfile => {
          if (userProfile) {
            setIsAuthenticated(true);
            console.log(`Setting user ${JSON.stringify(userProfile)}`);
            setUser(userProfile);
          }
        })
        .catch(error => {
          console.error("setting user to undefined");
          setUser(undefined);
          console.log(error);
        });

      // fetch user profile upon login
      getDetailedProfile()
        .then(res => {
          if (res) {
            setHasDetailedProfile(true);
            setIsInitializing(false);
          }
          setIsInitializing(false);
        })
        .catch(error => {
          console.log(error);
          setIsInitializing(false);
          setHasDetailedProfile(false);
        });
    };

    initAuth0();
  }, []);

  const loginWithPopup = async (options?: PopupLoginOptions) => {
    // setIsPopupOpen(true);
    // try {
    //   await auth0Client!.loginWithPopup(options);
    // } catch (error) {
    //   console.error(error);
    // } finally {
    //   setIsPopupOpen(false);
    // }
    // const userProfile = await auth0Client!.getUser();
    // setUser(userProfile);
    // setIsAuthenticated(true);
  };

  const handleRedirectCallback = async () => {
    // setIsInitializing(true);
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const result = await auth0Client!.handleRedirectCallback();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const userProfile = await auth0Client!.getUser();
    // setIsInitializing(false);
    // setIsAuthenticated(true);
    setUser(userProfile);
    return result;
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const loginWithRedirect = (options?: RedirectLoginOptions) => auth0Client!.loginWithRedirect(options);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const getTokenSilently = (options?: GetTokenSilentlyOptions) => auth0Client!.getTokenSilently(options);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const logout = (options?: LogoutOptions) => auth0Client!.logout(options);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const getIdTokenClaims = (options?: getIdTokenClaimsOptions) => auth0Client!.getIdTokenClaims(options);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const getTokenWithPopup = (options?: GetTokenWithPopupOptions) => auth0Client!.getTokenWithPopup(options);

  return (
    <Auth0Context.Provider
      value={{
        user,
        isAuthenticated,
        hasDetailedProfile,
        isInitializing,
        isPopupOpen,
        loginWithPopup,
        loginWithRedirect,
        logout,
        getTokenSilently,
        handleRedirectCallback,
        getIdTokenClaims,
        getTokenWithPopup,
        updateProfile,
      }}
    >
      {children}
    </Auth0Context.Provider>
  );
};
